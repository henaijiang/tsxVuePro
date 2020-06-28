/**防抖 */
function debounce(fn: Function, delay = 500) {
  let timer: number;
  return function(this: any){
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(()=>{
      fn.apply(this, args);
    }, delay)
  }
}
export{
  debounce
}