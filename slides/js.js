
<div class="marquee">
    <ul class="marquee-content">
        <li><i class="fab fa-github"></i></li>
    </ul>
</div>
import { toTitleCase } from "../utils.js";
export function createSlides(items) {
    let items = items.map((item) => {
        return `
        <li class="${item.brand}">
        <a href="${item.link}" target="_blank" class="${item.class}">
        <img src="https://margin-dev.github.io/brands/${toTitleCase(item.brand)}.png">
        <span>${item.action}</span>
        </a>
        </li>`
    })
    return `
    <div class="marquee">
        <ul class="marquee-content">
            ${items.join("")}
        </ul>
    </div>
    `
}
export function initializeSlides(items) {
    const slides = createSlides(items);
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