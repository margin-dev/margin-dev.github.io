import "https://code.jquery.com/jquery-3.7.1.min.js";
import { toTitleCase } from "../utils.js";

export const config = {
  interval: 3000,
  switchers: true,
  loop: true,
  position: "top",
  control: "full",
  items: [
    {
      brand: "kralbet",
      link: "",
      openInNewTab: true,
      action: "Kayıt Ol",
      vip: true,
      offers: ["400 TL Deneme Bonusu", "İsteyene Gizli Üyelik Sistemi!"],
    },
    {
      brand: "zbahis",
      link: "",
      openInNewTab: true,
      action: "Kayıt Ol",
      vip: true,
      offers: ["500 TL Deneme Bonusu", "%30 Günlük Kayıp Bonusu"],
    },
    {
      brand: "fixbet",
      link: "",
      openInNewTab: true,
      action: "Kayıt Ol",
      vip: true,
      offers: ["333 TL Deneme Bonusu", "5 Dakikada Çekim & Limitsiz Kazanç"],
    },
  ],
};

function createOffers(offers) {
  return `
    <div class="alert-bonus">
        ${offers
          .map((offer, index) => {
            return `<span class="alert-bonus-item">${offer}</span>`;
          })
          .join("")}
    </div>`;
}
function createItems(items) {
  return items
    .map((item, index) => {
      return `
        <div class="alert-item ${index == 0 ? "active" : ""}" data-brand="${item.brand}">
            <button class="alert-close"></button>
            <a class="alert-link" target="${item.openInNewTab ? "_blank" : "_self"}" href="${item.link}">
                <img src="https://margin-dev.github.io/brands/${toTitleCase(item.subfix ? item.brand + item.subfix : item.brand)}.png" class="alert-brand">
                ${createOffers(item.offers)}
                <span class="alert-action">${item.action ? item.action : "Giriş yap"}</span>
            </a>
        </div>`;
    })
    .join("");
}

export function initializeAlertSlider(config) {
  try {
    let slides = $(".alert-wrapper .alert-item");
    let slidesCount = config.items.length;
    function slide(target) {
      slides.removeClass("active").eq(target).addClass("active");
      let brand = $(".alert-wrapper").find(".alert-item.active").data("brand");
      $(".alert-wrapper").attr("data-brand", brand).find(".active").attr("data-brand", brand);
    }
    function getTarget(dir) {
      var ind = $(".alert-wrapper .alert-item.active").index();
      return (ind + (dir || 1)) % slidesCount;
    }

    setInterval(function () {
      slide(getTarget());
    }, config.interval);
  } catch (e) {
    console.log(e);
  }
}
export function createAlerts(config) {
  try {
    let alerts = `
        <div class="alert-wrapper ${config.showMultiple ? "multiple" : ""}" data-brand="${config.items[0].brand}">
            ${createItems(config.items)}
        </div>    
        `;
    let parent = document.querySelector("script[id='alerts']").parentNode;
    parent.insertAdjacentHTML("beforeend", alerts);
    parent.classList.add("alerts-parent");
  } catch (error) {
    console.log(error);
  }
  const closeButtons = document.querySelectorAll(".alert-wrapper .alert-close");
  closeButtons.forEach((button) => {
    button.addEventListener("click", closeFunction, !1);
    function closeFunction() {
      if (document.querySelectorAll(".alert-item:not(.active)").length != 0) {
        document.querySelector(".alert-wrapper .alert-item:not(.active)").classList.add("active");
      }
      this.parentElement.remove();
      if (document.querySelectorAll(".alert-item").length == 0) {
        document.querySelector(".alert-wrapper").remove();
      }
    }
  });
  if (!config.showMultiple) initializeAlertSlider(config);
}
