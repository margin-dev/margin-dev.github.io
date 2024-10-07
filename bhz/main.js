import { toTitleCase } from "../utils.js";
import "https://code.jquery.com/jquery-3.7.1.slim.js";
const defaultAction = {
  text: "Giriş Yap",
  shine: false,
};
const defaultItem = {
  color: {
    primary: "#000",
    secondary: "#FFF",
  },
  brand: "w88",
  link: "#",
  vip: false,
  shine: false,
  offers: ["Bonus-1", "Bonus-2"],
  action: {
    text: "Giriş Yap",
    shine: false,
  },
};

export const defaultConfig = {
  main: {
    action: "Giriş Yap",
    title: "title",
    items: [
      {
        brand: "w88",
        link: "#",
      },
      {
        brand: "w88",
        link: "#",
        shine: true,
      },
      {
        brand: "w88",
        link: "#",
      },
      {
        brand: "w88",
        link: "#",
      },
      {
        brand: "w88",
        link: "#",
        action: {
          text: "Giriş Yap",
          shine: true,
        },
      },
    ],
  },
  aside: {
    title: "title",
    header: {
      action: "Giriş Yap",
      interval: 3000,
      items: [
        {
          brand: "w88",
          link: "#w88",
        },
        {
          brand: "zlot",
          link: "#w88",
          shine: true,
        },
      ],
    },
    banners: {
      left: {
        brand: "w88",
        link: "/bzh-left-link",
        image: "https://placehold.co/180x440",
      },
      right: {
        brand: "sahabet",
        link: "/bzh-right-link",
        image: "https://placehold.co/180x440",
      },
    },
  },
};

function createOffers(offers) {
  let items = "";
  offers.forEach((offer) => {
    items += `<p>${offer}</p>`;
  });
  return items;
}

export function init(config) {
try{
  
  if (config.main) createArticle(config.main);
  if (config.aside) createAside(config.aside);
}catch(error){
  console.log(error)
}
}
export function createArticle(config) {
  let article = document.querySelector("#bzh main > article");
  if (config.title) {
    let title = `<h1>${config.title}</h1>`;
    article.insertAdjacentHTML("beforeend", title);
  }
  let items = "";
  config.items.forEach((item) => {
    item = { ...defaultItem, ...item };
    item.action = { ...defaultAction, ...item.action };

    items += `
    <a href="${item.link}" class="item ${item.vip ? "vip" : ""} ${item.shine ? "shine" : ""} ${item.brand.toLowerCase()}" target="_blank">
        <img src="${item.image ? item.image : `https://margin-dev.github.io/brands/${toTitleCase(item.brand)}.png`}" alt="${item.brand}">
        <div class="offers">${createOffers(item.offers)}</div>
        <span class="action ${item.action.shine ? "shine" : ""}">${item.action.text}</span>
    </a>
    `;
  });
  article.insertAdjacentHTML("beforeend", items);
  article.style.gridTemplateRows = `repeat(${Math.ceil(config.items.length / 2)},1fr)`;
}

export function createAside(config) {
  let aside = document.querySelector("#bzh aside");
  

  if (config.title) {
    let title = `<h1>${config.title}</h1>`;
    aside.insertAdjacentHTML("afterBegin", title);
    aside.classList.add("hastitle");
  }
  if(config.mobile){
    let header = document.querySelector("#bzh aside > header > #mobile");
    header.insertAdjacentHTML("beforeend", createHeader(config.header));
    initializeSlider(config.header);
  }else{
    let header = document.querySelector("#bzh aside > header > #pc");
    header.insertAdjacentHTML("beforeend", createHeader(config.header));
    initializeSlider(config.header);
  }
  if(config.banners){    
    let banners = document.querySelector("#bzh aside > .banners");
    banners.insertAdjacentHTML("beforeend", createBanners(config.banners));
  }
}

export function initializeSlider(config) {
  try {
    let slides = $("header .slide");
    let slidesCount = config.items.length;
    function slide(target) {
      slides.removeClass("active").eq(target).addClass("active");
      let brand = $("#bzh header").find(".slide.active").data("brand");
      $("#bzh header").attr("data-brand", brand).find(".active").attr("data-brand", brand);
    }

    $("#bzh header .btn-prev").click(function () {
      slide(getTarget(-1));
      resetTimer();
    });
    $("#bzh header .btn-next").click(function () {
      slide(getTarget());
      resetTimer();
    });
    function getTarget(dir) {
      var ind = $("#bzh header .slideset .slide.active").index();
      return (ind + (dir || 1)) % slidesCount;
    }
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () {
        slide(getTarget());
      }, config.interval);
    }

    var timer = setInterval(function () {
      slide(getTarget());
    }, config.interval);
  } catch (e) {
    console.log(e);
  }
}
function createSlides(items) {
  return items
    .map((item, index) => {
      item = { ...defaultItem, ...item };
      item.action = { ...defaultAction, ...item.action };

      return `
        <a href="${item.link}" class="slide item ${index == 0 ? "active" : ""} ${item.vip ? "vip" : ""} ${item.shine ? "shine" : ""} ${item.brand.toLowerCase()}" data-brand="${item.brand.toLowerCase()}" target="_blank">
            <img src="${item.image ? item.image : `https://margin-dev.github.io/brands/${toTitleCase(item.brand)}.png`}" alt="${item.brand}">
            <div class="offers">${createOffers(item.offers)}</div>
            <span class="action ${item.action.shine ? "shine" : ""}">${item.action.text}</span>
        </a>`;
    })
    .join("");
}
function createHeader(config) {
  let widget = `
    <div class="slideset">
        ${createSlides(config.items)}
    </div>
    <button class="btn-prev control"></button>
    <button class="btn-next control"></button>`;
  return widget;
}

function createBanners(config) {
  let items = "";
  Object.keys(config).forEach((key) => {
    let item = config[key];
    item = { ...defaultItem, ...item };
    items += `
    <a href="${item.link}" class="${key} item ${item.vip ? "vip" : ""} ${item.shine ? "shine" : ""} ${item.brand.toLowerCase()}" target="_blank">
        <img src="${item.image}" alt="${item.brand}">
    </a>
    `;
  });
  return items;
}
