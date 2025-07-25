export default function run(config = {
    mode: "normal"
}) {
    const items = Array.from(document.querySelectorAll(".card.link-btn-rounded"));
    if (items.length == 0) return;
    const alerts = items.map((etr) => {
        const cont = etr.firstElementChild;
        const arr = Array.from(cont.children)
        const brand = arr[0].innerText;
        const link = arr[2].innerText;
        const alertItem = `
<a class="alert-popup-item ${brand.toLowerCase()}" href="${link}" target="_blank">
<button class="alert-popup-close">x</button>
<img src="https://margin-dev.github.io/brands/${brand}.png"/>
<div class="alert-popup-bonus">
${arr.map((child, idx) => {
            if (idx <= 2) return
            return `<span>${child.innerText}</span>`
        }).join("")}
</div>
<span>Tıkla Kayıt Ol!</span>
</a>
`
        return alertItem
    })
    const alertPopup = `
<div class="alert-popup ${config.mode}">
${alerts.join("")}
</div>
`
    document.querySelector("#links>.row").insertAdjacentHTML("beforeend", alertPopup);
    items.forEach((item) => {
        item.parentElement.remove();
    })
    const close = document.querySelectorAll(".alert-popup-close")
    close.forEach((e) => {
        e.addEventListener("click", (ev) => {
            ev.preventDefault();
            e.parentElement.remove();
            if (document.querySelectorAll(".alert-popup-item").length == 0) {
                document.querySelector(".alert-popup").remove();
            }
        })
    })
}