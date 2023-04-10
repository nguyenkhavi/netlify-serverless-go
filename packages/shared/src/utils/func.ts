export const debounce = (fn: Function, ms: number) => {
  let t: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(t)
    t = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}
export const throttle = (fn: Function, ms: number) => {
  let t: NodeJS.Timeout | null = null

  return (...args: any[]) => {
    if (t !== null) return
    t = setTimeout(() => {
      fn(...args)
      t = null
    }, ms)
  }
}
