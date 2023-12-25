import { sleep } from "@/utils/sleep";

export const TestSlowComponent = async ({ timeout }: { timeout: number }) => {
  await sleep(timeout);
  return <h1>Hello world</h1>;
};
