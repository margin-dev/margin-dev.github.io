import { toTitleCase } from "../utils.js";
export const config = {
  items: [
    {
      brand: "kralbet",
      link: "",
      openInNewTab: true,
      vip: true,
      shine: false,
      image: "",
    },
    {
      brand: "zbahis",
      link: "",
      openInNewTab: true,
      vip: true,
      shine: false,
      image: "",
    },
    {
      brand: "fixbet",
      link: "",
      openInNewTab: true,
      vip: true,
      shine: false,
      image: "",
    },
  ],
};

function createItems(config) {
  return config.items
    .map((item, index) => {
      item.openInNewTab = item.openInNewTab ? item.openInNewTab : true;
      return `
        <a class="block ${item.shine ? "shine" : ""} ${item.brand}" href="${item.link}" target="${item.openInNewTab ? "_blank" : "_self"}">
            ${!item.image ? `<img src="/cst-block-${item.brand}">` : item.image}
        </a>`;
    })
    .join("");
}
export function createBlocks(config) {
  console.log("creating blocks");
  try {
    let parent = document.querySelector("section");
    parent.insertAdjacentHTML("beforeend", createItems(config));
  } catch (error) {
    console.log(error);
  }
  console.log("blocks created");
}
