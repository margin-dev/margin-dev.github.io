export const SliderJson = {
    interval: 3000,
    switchers: true,
    loop: true,
    control: "full",
    items: [
        {
            brand: "bahis1000",
            link: "https://www.bahis1000.com",
            openInNewTab: true,
            vip: true,
            offers: [
                "100 TL Deneme Bonusu",
                "100 TL Deneme Bonusu",
                "100 TL Deneme Bonusu",
            ]

        }
    ]
}

function createOffers(offers) {
    return `<div class="bonuswrapper">${offers.map((offer, index) => {
        return `<p>${offer}</p>`
    })}</div>`
}
function createSlides(items) {
    return items.map((item, index) => {
        return `
        <a class="slide ${index == 0 ? 'active' : ''}" target="${item.openInNewTab ? '_blank' : '_self'}" data-brand="${item.brand}" href="${item.link}">
            <div class="actionwrapper">
                <p><img src="https://margin-dev.github.io/brands/${item.brand}.png"/></p>
                <span class="action">Katıl</span>
            </div>
            ${createOffers(item.offers)}
        </a>`
    })
}
function createSwitchers(items) {
    let controlers = items.map((item, index) => {
        return `<li><button class="${index == 0 ? 'active' : ''}">${item.brand}</button></li>`
    })
    return `
    <div class="control-links">
        <div class="switcher-holder">
            <ul class="switcher">${controlers.join('')}</ul>
        </div>
    </div>`
}

export function createSlider(config) {
    var switchers = createSwitchers(config.items);
    let slider = `
    <div class="widget" data-brand="${config.items[0].brand}" data-controls="${config.switchers}">
        <div class="slideset">
            ${createSlides(config.items)}
            <button class="btn-prev ${config.control}"></button>
            <button class="btn-next ${config.control}"></button>
        </div>
        ${config.switchers ? switchers : ''}
    </div>    
    `
    let block = `
    <div id="biolink_block_id_${9999}" data-biolink-block-id="${9999}" class="col-12 my-2">
        ${slider}
    </div>`
    let links = document.querySelector("#links > .row");
    links.appendChild(block);
}