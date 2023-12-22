import React, { Suspense } from "react";

import { Map } from "@/components/Map";
import { TestComponent } from "@/components/TestComponent";
import { YMapsProvider } from "@/components/YMapsProvider";


export default function Home() {
  return (
    <main>
      <TestComponent />
      <Suspense fallback="loading...">
        <YMapsProvider />
      </Suspense>
    </main>
  );
}
