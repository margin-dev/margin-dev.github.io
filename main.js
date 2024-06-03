import 'https://code.jquery.com/jquery-3.7.1.min.js'

export const SliderJson = {
    interval: 3000,
    switchers: true,
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
            ]
        },
        {
            brand: "zbahis",
            link: "",
            openInNewTab: true,
            vip: true,
            offers: [
                "500 TL Deneme Bonusu",
                "%30 Günlük Kayıp Bonusu",
            ]
        },
        {
            brand: "fixbet",
            link: "",
            openInNewTab: true,
            vip: true,
            offers: [
                "333 TL Deneme Bonusu",
                "5 Dakikada Çekim & Limitsiz Kazanç",
            ]
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
    return `<div class="bonuswrapper">${offers.map((offer, index) => {
        return `<p>${offer}</p>`
    }).join("")}</div>`
}
function createSlides(items) {
    return items.map((item, index) => {
        return `
        <a class="slide ${index == 0 ? 'active' : ''}" target="${item.openInNewTab ? '_blank' : '_self'}" data-brand="${item.brand}" href="${item.link}">
            <div class="actionwrapper">
                <p><img src="https://margin-dev.github.io/brands/${toTitleCase(item.brand)}.png"/></p>
                <span class="action">Katıl</span>
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
    console.log("initializing slider")
    try {
        console.log(config)
        let slides = $('.widget ul.slideset li');
        let switchers = $('.widget ul.switcher li');
        let slidesCount = config.items.length;
        function slide(target) {
            slides.removeClass('active').eq(target).addClass('active');
            switchers.removeClass('active').eq(target).addClass('active');
        }
        function getTarget(dir) {
            var ind = $('.widget ul.switcher li.active').index();
            return (ind + (dir || 1)) % slidesCount;
        }
        function resetTimer(timer) {
            clearInterval(timer);
            timer = setInterval(function () { slide(getTarget()); }, config.interval);
        }

        switchers.first().addClass('active');
        switchers.on('mouseenter', function () {
            if (!$(this).hasClass('active')) {
                slide($(this).index());
                resetTimer(timer);
            }
        });
        $('.btn-prev').click(function () {
            slide(getTarget(-1));
            resetTimer(timer);
        });
        $('.btn-next').click(function () {
            slide(getTarget());
            resetTimer(timer);
        });
        var timer = setInterval(function () { slide(getTarget()); }, config.interval);
    } catch (e) {
        console.log(e)
    }
    console.log("slider initialized")

}
export function createSlider(config) {
    console.log("creating slider")
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
        let block = `
        <div id="biolink_block_id_${9999}" data-biolink-block-id="${9999}" class="col-12 my-2">
            ${widget}
        </div>`
        let links = document.querySelector("#links > .row");
        links.insertAdjacentHTML('beforeend', block);
    } catch (error) {
        console.log(error)
    }
    console.log("slider created")
}
