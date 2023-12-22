"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Script from "next/script";

import { IYMapModules } from "@/types";

const getYmapsModules = async () => {
  await window.ymaps3.ready;
  const ymaps3React = await window.ymaps3.import("@yandex/ymaps3-reactify");

  const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

  const YMapZoomControlModule = await ymaps3.import(
    "@yandex/ymaps3-controls@0.0.1",
  );
  const YMapDefaultMarkerModule = await ymaps3.import(
    "@yandex/ymaps3-markers@0.0.1",
  );

  return {
    YMap: reactify.module(ymaps3).YMap,
    YMapDefaultSchemeLayer: reactify.module(ymaps3).YMapDefaultSchemeLayer,
    YMapControls: reactify.module(ymaps3).YMapControls,
    YMapDefaultFeaturesLayer: reactify.module(ymaps3).YMapDefaultFeaturesLayer,
    YMapZoomControl: reactify.module(YMapZoomControlModule).YMapZoomControl,
    YMapDefaultMarker: reactify.module(YMapDefaultMarkerModule)
      .YMapDefaultMarker,
    YMapMarker: reactify.module(ymaps3).YMapMarker,
    YMapFeature: reactify.module(ymaps3).YMapFeature,
    YMapListener: reactify.module(ymaps3).YMapListener,
  };
};

export const Map = ({ js }: { js: string }) => {
  const [modules, setModules] = useState<IYMapModules | null>();

  useEffect(() => {
    const processYmapsModules = async () => {
      const modules = await getYmapsModules();
      setModules(modules);
    };

    processYmapsModules();
  }, []);

  return (
    <div>
      <Script id="ymaps-code">{js}</Script>
      <h2>there is map</h2>
      <div id="map" style={{ width: 300, height: 300 }}>
        {modules && (
          <modules.YMap location={{ center: [37.588144, 55.733842], zoom: 10 }}>
            <modules.YMapDefaultSchemeLayer />
          </modules.YMap>
        )}
      </div>
    </div>
  );
};
