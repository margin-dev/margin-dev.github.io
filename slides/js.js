import { toTitleCase } from "../utils.js";
export function createSlides(config) {
    let items = config.items.map((item) => {
        return `
        <li class="${item.brand.toLowerCase()}">
        <a href="${item.link}" target="_blank" class="${item.class}">
        <img src="https://margin-dev.github.io/brands/${toTitleCase(item.brand)}.png">
        <span>${item.action}</span>
        </a>
        </li>`
    })
    return `
    <div class="slides">
        <ul class="slides-content">
            ${items.join("")}
            ${items.join("")}
        </ul>
    </div>
    `
}
export function initializeSlides(config) {
    const slides = createSlides(config);
    let parent = document.querySelector("script[id='slides']").parentNode
    parent.insertAdjacentHTML("beforeend", slides);
    const root = document.documentElement;
    const slidesElementsDisplayed = getComputedStyle(root).getPropertyValue("--slides-elements-displayed");
    const slidesContent = document.querySelector("ul.slides-content");
    root.style.setProperty("--slides-elements", slidesContent.children.length);
    for (let i = 0; i < slidesElementsDisplayed; i++) {
        slidesContent.appendChild(slidesContent.children[i].cloneNode(true));
    }
}