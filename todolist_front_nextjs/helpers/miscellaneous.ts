import { status } from "@/services";

export function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export async function consoleAPIStatus() {
  const s = await status();
  console.log(s);
}