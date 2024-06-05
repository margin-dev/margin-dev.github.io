import 'https://code.jquery.com/jquery-3.7.1.min.js'

export const config = {
    interval: 3000,
    switchers: true,
    position: "bottom",
    action: "Giriş Yap",
    loop: true,
    control: "full",
    items: [
        {
            brand: "kralbet",
            link: "",
            openInNewTab: true,
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
            vip: true,
            offers: [
                "333 TL Deneme Bonusu",
                "5 Dakikada Çekim & Limitsiz Kazanç",
            ],

        }
    ]
}
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
function createOffers(offers) {
    return `<div class="bonus-wrapper">${offers.map((offer, index) => {
        return `<span>${offer}</span>`
    }).join("")}</div>`
}


function createItems(config) {
    return config.items.map((item, index) => {
        return `
        <a href="${item.link}" target="${item.openInNewTab ? '_blank' : '_self'}" class="popup ${config.position} ${item.brand} ${index == 0 ? 'active' : ''}">
            ${config.close ?? `<button class="close-popup">X</button> `}
            ${!item.image ? `<img src="https://margin-dev.github.io/brands/${toTitleCase(item.brand)}.png">` : item.image}
            ${createOffers(item.offers)}
            <span>${config.action}</span>
        </a>`
    }).join("")
}

export function initializePopupSlider(config) {
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
        setInterval(function () { slide(getTarget()); }, config.interval);
    } catch (e) {
        console.log(e)
    }
    console.log("popupslider initialized")
}
export function createPopup(config) {
    console.log("creating popup")
    try {
        let popups = `
        <div class="popups col-12" data-brand="${config.items[0].brand}">
            ${createItems(config)}
        </div>    
        `
        let block = `
        <div id="biolink_block_id_${9999}" data-biolink-block-id="${9999}" class="col-12 my-2">
            ${popups}
        </div>`
        let links = document.querySelector("#links > .row");
        links.insertAdjacentHTML('beforeend', block);
    } catch (error) {
        console.log(error)
    }
    console.log("popup created")
    initializePopupSlider(config)
}

