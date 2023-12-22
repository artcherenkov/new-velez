import { Map } from "@/components/Map";
import { sleep } from "@/utils/sleep";

export async function YMapsProvider() {
  const response = await fetch("https://velez-trip.ru/api/load-ymaps");

  const js = await response.text();

  await sleep(500);

  return (
    <>
      <h1>Map will be here</h1>
      <Map js={js} />
    </>
  );
}
