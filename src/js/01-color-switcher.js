function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
  const startbtnEl = document.querySelector("button[data-start]");
  const stopbtnEl = document.querySelector("button[data-stop]");
  const bodyEl = document.querySelector("body");

  startbtnEl.addEventListener('click',startFunction);
  stopbtnEl.addEventListener('click',stopFunction)

  function startFunction(e){
    e.target.disabled=true;
    timer = setInterval(()=>{
    bodyEl.style.backgroundColor=getRandomHexColor();
    },1000)
  }
  function stopFunction(e){
    startbtnEl.disabled=false;
    clearTimeout(timer);
  }