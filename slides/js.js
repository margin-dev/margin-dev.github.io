import { toTitleCase,not } from "../utils.js";
export function createSlides(config) {
    let items = config.items.map((item) => {
        return `
        <a href="${item.link}" target="_blank" class="${item.class} ${item.brand.toLowerCase()}">
            <img src="https://margin-dev.github.io/brands/${toTitleCase(item.brand)}.png">
            <span>${item.action}</span>
        </a>
        `
    })
    return `
    <div class="slides">
        ${config.leftItem ? `<div class="slides__left">${config.leftItem}</div>` : ""}
        <div class="slides__group">
            ${items.join("")}
        </div>
        <div class="slides__group">
            ${items.join("")}
        </div>
        ${config.rightItem ? `<div class="slides__right">${config.rightItem}</div>` : ""}
    </div>
    `
}
export function initializeSlides(config) {
    if(not)return
    const slides = createSlides(config);
    let parent = document.querySelector("script[id='slides']").parentNode
    parent.classList.add("slides-parent")
    parent.insertAdjacentHTML("beforeend", slides);
}