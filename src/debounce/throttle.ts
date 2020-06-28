/**节流 */
function throttle(fn: Function, delay = 1000) {
  let last: number;
  let deferTimer: number;
  return function (this: any) {
    let _args = arguments;
    let now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(this, _args);
      }, delay);
    } else {
      last = now;
      fn.apply(this, _args);
    }
  }
}
export{
  throttle
}