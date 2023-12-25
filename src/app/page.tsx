import React, { Suspense } from "react";

import { Main } from "@/components/Main";
import { Map } from "@/components/Map";
import { TestSlowComponent } from "@/components/TestSlowComponent";

export default async function Home() {
  return (
    <main>
      <Main map={<Map />}>
        <Suspense fallback="Loading...">
          <TestSlowComponent timeout={3000} />
        </Suspense>

        <Suspense fallback="Loading...">
          <TestSlowComponent timeout={5000} />
        </Suspense>
      </Main>
    </main>
  );
}
