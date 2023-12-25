"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import Script from "next/script";

import { sleep } from "@/utils/sleep";

/**
 * Проблема находится в этой функции. Если запустить приложение не меняя код,
 * то все сработает как надо: оба Suspense'a начнут работу и, до окончания их работы в консоли
 * выведется "wtf someAnotherFunc done", а соответствующая строка на странице тоже примет это значение.
 * Если раскоментить хотя бы одну строку (например, "await window.ymaps3.ready"),
 * то сразу же будет заметно, что текст в консоли появится только после того, как отработают ВСЕ
 * Suspense, то есть код будет ждать, пока отрабатает TestSlowComponent с наибольшим таймаутом.
 *
 * Я пробовал решить проблему как угодно: убирал и добавлял директивы "use client", передавал компонент Map
 * через пропсы в Main, передавал Map просто через children и даже рендерил напрямую в page.tsx; создавал другие асинхронные функции,
 * чтобы смоделировать поведение функции getYmapsModules, но всегда все было нормально. Даже добавил в глобальный объект window
 * асинхронную функцию sayHi, но и это не помогло воспроизвести поведение, происходящее при вызове функций из пакета ymaps. Причем не важно,
 * какую именно функцию вызывать – баг воспроизводится и с window.ymaps3.import("@yandex/ymaps3-reactify"), и с window.ymaps3.ready
 */
const getYmapsModules = async () => {

  const result = await window.sayHi()

  console.log(result)
  // await window.ymaps3.ready;
  // const ymaps3React = await window.ymaps3.import("@yandex/ymaps3-reactify");

  // const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

  // return {
  //   YMap: reactify.module(ymaps3).YMap,
  //   YMapDefaultSchemeLayer: reactify.module(ymaps3).YMapDefaultSchemeLayer,
  // };

  return {
    foo: "bar",
    baz: "qux"
  };
};

const someAnotherFunc = async () => {
  await sleep(100);
  return "wtf someAnotherFunc done";
};

const someFunc = async () => {
  return await someAnotherFunc();
};

window.sayHi = async () => {
  await sleep(1000)
  return "hi world"
}

export const Map = () => {
  const [string, setString] = useState("none");
  const [modules, setModules] = useState<any>(null);

  const onScriptLoad = async () => {

    const string = await someFunc();
    const modules = await getYmapsModules();
    setModules(modules);
    setString(string);
    console.log(string);
  };

  return (
    <>
      <h2>{string}</h2>
      <Script
        id="ymaps-code"
        src="https://velez-trip.ru/api/load-ymaps"
        onLoad={onScriptLoad}
      />
    </>
  );
};
