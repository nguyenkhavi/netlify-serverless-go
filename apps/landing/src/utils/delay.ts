export default function delay<T extends (...args: any) => any>(fn: T, time: number) {
  return new Promise<ReturnType<T>>((resolve) => setTimeout(() => resolve(fn()), time));
}
