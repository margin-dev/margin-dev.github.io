import 'https://code.jquery.com/jquery-3.7.1.min.js'
import { toTitleCase,not } from '../utils.js';

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
            actionShine: true,
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
            actionShine: true,
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
            actionShine: true,
            vip: true,
            offers: [
                "333 TL Deneme Bonusu",
                "5 Dakikada Çekim & Limitsiz Kazanç",
            ],

        }
    ]
}

function createOffers(offers) {
    return `<div class="bonuswrapper">${offers.map((offer, index) => {
        return `<p>${offer}</p>`
    }).join("")}</div>`
}
function createSlides(items) {
    return items.map((item, index) => {
        return `
        <a class="slide ${index == 0 ? 'active' : ''}" target="${item.openInNewTab ? '_blank' : '_self'}" data-brand="${item.brand}" href="${item.link}">
            <div class="actionwrapper">
                <p>${!item.image ? `<img src="https://margin-dev.github.io/brands/${toTitleCase(item.brand ? item.brand : item.logo)}.png">` : item.image}</p>
                <span class="action ${item.actionShine ? 'shine' : ''}">${item.action ? item.action : "Katıl"}</span>
            </div>
            ${createOffers(item.offers)}
        </a>`
    }).join("")
}
function createSwitchers(items) {
    let controlers = items.map((item, index) => {
        return `<li><button class="${index == 0 ? 'active' : ''}">${item.brand}</button></li>`
    }).join("")
    return `
    <div class="control-links">
        <div class="switcher-holder">
            <ul class="switcher">${controlers}</ul>
        </div>
    </div>`
}

export function initializeSlider(config) {
    try {
        let slides = $('.widget .slideset .slide');
        let switchers = $('.widget ul.switcher li');
        let slidesCount = config.items.length;
        switchers.first().addClass('active');
        function slide(target) {
            slides.removeClass('active').eq(target).addClass('active');
            switchers.removeClass('active').eq(target).addClass('active');
            let brand = $(".widget").find(".slide.active").data("brand")
            $(".widget").attr("data-brand", brand).find(".active").attr("data-brand", brand);
        }


        switchers.on('mouseenter', function () {
            if (!$(this).hasClass('active')) {
                slide($(this).index());
                resetTimer();
            }
        });
        $('.widget .btn-prev').click(function () {
            slide(getTarget(-1));
            resetTimer();
        });
        $('.widget .btn-next').click(function () {
            slide(getTarget());
            resetTimer();
        });
        function getTarget(dir) {
            var ind = $('.widget ul.switcher li.active').index();
            return (ind + (dir || 1)) % slidesCount;
        }
        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(function () { slide(getTarget()); }, config.interval);
        }

        var timer = setInterval(function () { slide(getTarget()); }, config.interval);
    } catch (e) {
        console.log(e)
    }
}
export function createSlider(config) {
    if(!not) return
    try {
        let widget = `
        <div class="widget" data-brand="${config.items[0].brand}" data-controls="false">
            <div class="slideset">
                ${createSlides(config.items)}
                <button class="btn-prev ${config.control}"></button>
                <button class="btn-next ${config.control}"></button>
            </div>
            ${config.switchers ? createSwitchers(config.items) : ''}
        </div>    
        `
        let parent = document.querySelector("script[id='slider']").parentNode
        parent.insertAdjacentHTML("beforeend", widget);
    } catch (error) {
        console.log(error)
    }
    initializeSlider(config)
}
