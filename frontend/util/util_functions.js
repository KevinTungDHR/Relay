export const myThrottle = (func, wait) => {
  let tooSoon = false;
  return (event)=>{
    if(!tooSoon) {
      tooSoon = true;
      setTimeout(()=>{
        tooSoon = false;
      }, wait);
      func(event);
    }
  };
}

