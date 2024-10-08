import "https://code.jquery.com/jquery-3.7.1.min.js";
import { toTitleCase } from "../utils.js";

export const config = {
  interval: 3000,
  switchers: true,
  position: "bottom",
  action: "Giriş Yap",
  background: "#181D27",
  loop: true,
  control: "full",
  items: [
    {
      brand: "kralbet",
      link: "",
      openInNewTab: true,
      vip: true,
      offers: ["400 TL Deneme Bonusu", "İsteyene Gizli Üyelik Sistemi!"],
    },
    {
      brand: "zbahis",
      link: "",
      openInNewTab: true,
      vip: true,
      offers: ["500 TL Deneme Bonusu", "%30 Günlük Kayıp Bonusu"],
    },
    {
      brand: "fixbet",
      link: "",
      openInNewTab: true,
      vip: true,
      offers: ["333 TL Deneme Bonusu", "5 Dakikada Çekim & Limitsiz Kazanç"],
    },
  ],
};

function createOffers(offers) {
  return `<div class="bonus-wrapper">${offers
    .map((offer, index) => {
      return `<span>${offer}</span>`;
    })
    .join("")}</div>`;
}

function createItems(config) {
  return config.items
    .map((item, index) => {
      return `
        <a href="${item.link}" target="${item.openInNewTab ? "_blank" : "_self"}" class="popup ${config.position} ${item.brand} ${index == 0 ? "active" : ""}" ${config.background ? `style="background:${config.background}"` : ""}>
            ${config.close ?? `<button class="close-popup">X</button> `}
            ${!item.image ? `<img src="https://margin-dev.github.io/brands/${toTitleCase(item.logo ? item.logo : item.brand)}.png">` : item.image}
            ${createOffers(item.offers)}
            <span>${config.action}</span>
        </a>`;
    })
    .join("");
}

export function initializePopupSlider(config) {
  try {
    let slides = $(".popups .popup");
    let slidesCount = config.items.length;
    function slide(target) {
      slides.removeClass("active").eq(target).addClass("active");
      let brand = $(".popups").find(".popup.active").data("brand");
      $(".popups").attr("data-brand", brand).find(".active").attr("data-brand", brand);
    }
    function getTarget(dir) {
      var ind = $(".popups .popup.active").index();
      return (ind + (dir || 1)) % slidesCount;
    }

    const xs = document.querySelectorAll(".popup > .close-popup");
    xs.forEach((x) => {
      x.addEventListener("click", xe, !1);
      function xe(ev) {
        ev.preventDefault();
        this.parentElement.remove();
      }
    });
    setInterval(function () {
      slide(getTarget());
    }, config.interval);
  } catch (e) {
    console.log(e);
  }
}
export function createPopup(config) {
  try {
    let parent = document.querySelector("footer");
    parent.insertAdjacentHTML("beforeend", createItems(config));
    parent.classList.add("popup-parent", "popups");
    parent.attributes.setNamedItem("data-brand", config.items[0].brand);
  } catch (error) {
    console.log(error);
  }
  initializePopupSlider(config);
}
