import 'https://code.jquery.com/jquery-3.7.1.min.js'
import { toTitleCase } from '../utils.js';


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
            offers: [
                "400 TL Deneme Bonusu",
                "İsteyene Gizli Üyelik Sistemi!",
            ],
        },
        {
            brand: "zbahis",
            link: "",
            openInNewTab: true,
            action: "Kayıt Ol",
            vip: true,
            offers: [
                "500 TL Deneme Bonusu",
                "%30 Günlük Kayıp Bonusu",
            ],
        },
        {
            brand: "fixbet",
            link: "",
            openInNewTab: true,
            action: "Kayıt Ol",
            vip: true,
            offers: [
                "333 TL Deneme Bonusu",
                "5 Dakikada Çekim & Limitsiz Kazanç",
            ],

        }
    ]
}

function createOffers(offers) {
    return `
    <div class="alert-bonus">
        ${offers.map((offer, index) => {
        return `<span class="alert-bonus-item">${offer}</span>`
    }).join("")}
    </div>`
}
function createItems(items) {
    return items.map((item, index) => {
        return `
        <div class="alert-item ${index == 0 ? 'active' : ''}" data-brand="${item.brand}">
            <button class="alert-close"></button>
            <a class="alert-link" target="${item.openInNewTab ? '_blank' : '_self'}" href="${item.link}">
                <img src="https://margin-dev.github.io/brands/${toTitleCase(item.brand)}.png" class="alert-brand">
                ${createOffers(item.offers)}
                <span class="alert-action">${item.action ? item.action : "Giriş yap"}</span>
            </a>
        </div>`
    }).join("")
}

export function initializeAlertSlider(config) {
    console.log("initializing popupslider")
    try {
        let slides = $('.popups .popup');
        let slidesCount = config.items.length;
        function slide(target) {
            slides.removeClass('active').eq(target).addClass('active');
            let brand = $(".popups").find(".popup.active").data("brand")
            $(".popups").attr("data-brand", brand).find(".active").attr("data-brand", brand);
        }
        function getTarget(dir) {
            var ind = $('.popups .popup.active').index();
            return (ind + (dir || 1)) % slidesCount;
        }

        const xs = document.querySelectorAll(".popup > .close-popup");
        xs.forEach((x) => {
            x.addEventListener("click", xe, !1);
            function xe(ev) {
                ev.preventDefault();
                this.parentElement.remove()
            }
        })
        setInterval(function () { slide(getTarget()); }, config.interval);
    } catch (e) {
        console.log(e)
    }
    console.log("popupslider initialized")
}
export function createAlerts(config) {
    console.log("creating alert")
    try {
        let alerts = `
        <div class="alerts alert-wrapper" data-brand="${config.items[0].brand}">
            ${createItems(config)}
        </div>    
        `
        let parent = document.querySelector("script[id='alerts']").parentNode
        parent.insertAdjacentHTML("beforeend", alerts)
        parent.classList.add("alerts-parent");
    } catch (error) {
        console.log(error)
    }
    console.log("alerts created")
    initializeAlertSlider(config)
}
