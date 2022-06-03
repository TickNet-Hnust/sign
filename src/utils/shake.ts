// 防抖
export function debounce(fn: any, delay: any) {
  let timer: any
  return function() {
    if (timer)
      clearTimeout(timer)

    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}
