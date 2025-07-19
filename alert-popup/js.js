const items = Array.from(document.querySelectorAll(".card.link-btn-rounded"));
const alerts = items.map((etr)=>{
const cont = etr.firstElementChild;
const arr = Array.from(cont.children)
const brand = arr[0].innerText;
const link = arr[2].innerText;
const alertItem = `
<a class="alert-popup-item ${brand.toLowerCase()}" href="${link}">
<button class="alert-popup-close">X</button>
<img src="https://margin-dev.github.io/brands/${brand}.png"/>
<div class="alert-popup-bonus">
${arr.map((child,idx)=>{
  if(idx <=2) return
  return `<span>${child.innerText}</span>`
}).join("")}
</div>
<span>Tıkla Kayıt Ol!</span>
</a>
`
return alertItem
})
const alertPopup = `
<div class="alert-popup">
${alerts.join("")}
</div>
`
document.querySelector("#links>.row").insertAdjacentHTML("beforeend",alertPopup);
