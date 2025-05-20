export default function mrq(sc, s){
  const psc = document.querySelector(sc);
  const cl = psc.innerHTML; 
  const fe = psc.children[0]; 
  let i = 0; psc.insertAdjacentHTML("beforeend", cl);
  psc.insertAdjacentHTML("beforeend", cl);
  setInterval(function () {
    fe.style.marginLeft = `-${i}px`;
    if (i > fe.clientWidth) { i = 0 } i = i + s 
  }, 0)
}

