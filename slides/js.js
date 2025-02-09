import { toTitleCase } from "../utils.js";
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
        <div class="slides__group">
            ${items.join("")}
        </div>
        <div class="slides__group">
            ${items.join("")}
        </div>
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