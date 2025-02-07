import "https://code.jquery.com/jquery-3.7.1.min.js";

export const config = {
  interval: 3000,
  speed: 0.3,
  position: "top",
  background: "#181D27",
  loop: true,
  items: [
    {
      brand: "kralbet",
      link: "",
      openInNewTab: true,
      leftImage: "",
      rightImage: "",
      offers: ["400 TL Deneme Bonusu", "İsteyene Gizli Üyelik Sistemi!"],
    },
  ],
};

function createOffers(offers) {
  return `<div class="mrq_items">${offers
    .map((offer, index) => {
      return `<h1>${offer}</h1>`;
    })
    .join("")}</div>`;
}


export function createItems(config) {
  return config.items
    .map((item, index) => {
      return `
        <a href="${item.link}" class="${config.disabled ? "disabled" : ""} mrq full ${config.position} ${item.brand} ${index == 0 ? "active" : ""}" target="${item.openInNewTab ? "_blank" : "_self"}" ${config.background ? `style="background:${config.background}"` : ""}>
            ${item.leftImage && !item.leftContent ? `<img class="mrq_brand left" src="${item.leftImage}"/>` : ""}
            ${item.leftContent ? item.leftContent : ""}
            <div class="mrq_content">
                ${createOffers(item.offers)}
            </div>
            ${item.rightImage && !item.rightContent ? `<img class="mrq_brand right" src="${item.rightImage}"/>` : ""}
            ${item.rightContent ? item.rightContent : ""}
        </a>`;
    })
    .join("");
}
function mrq(sc, s) {
  const psc = document.querySelector(sc);
  const cl = psc.innerHTML;
  const fe = psc.children[0];
  let i = 0;
  psc.insertAdjacentHTML("beforeend", cl);
  psc.insertAdjacentHTML("beforeend", cl);
  setInterval(function () {
    fe.style.marginLeft = `-${i}px`;
    if (i > fe.clientWidth) {
      i = 0;
    }
    i = i + s;
  }, 0);
}

export function initializeMrqSlider(config) {
  try {
    let slides = $(".mrqs .mrq");
    let slidesCount = config.items.length;
    function slide(target) {
      slides.removeClass("active").eq(target).addClass("active");
      let brand = $(".mrqs").find(".mrq.active").data("brand");
      $(".mrqs").attr("data-brand", brand).find(".active").attr("data-brand", brand);
    }
    function getTarget(dir) {
      var ind = $(".mrqs .mrq.active").index();
      return (ind + (dir || 1)) % slidesCount;
    }
    config.items.map((item, index) => {
      setTimeout(() => {
        mrq(`.mrqs > .mrq.${item.brand} .mrq_content`, config.speed);
      }, 100);
    });
    setInterval(function () {
      slide(getTarget());
    }, config.interval);
  } catch (e) {
    console.log(e);
  }
}
export function createMrq(config) {
  try {
    let mrqs = `
    <div class="mrqs" data-brand="${config.items[0].brand}">
    ${createItems(config)}
    </div>    
    `;
    let parent = document.querySelector("script[id='mrqs']").parentNode;
    parent.insertAdjacentHTML("beforeend", mrqs);
    parent.classList.add("mrq-parent");
  } catch (error) {
    console.log(error);
  }
  if (!config.disabled) {
    initializeMrqSlider(config);
  }
}
