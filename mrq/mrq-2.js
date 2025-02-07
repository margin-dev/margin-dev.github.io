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

function createItems(config) {
    return config.items
        .map((item, index) => {
            return `
            <a href="${item.link}" class="brand-marquee ${item.brand.toLowerCase()} ${item.class ? item.class : ""}" target="_blank">
                <img class="brand-marquee-brand" src="https://margin-dev.github.io/brands/${item.brand}.png"/>
                ${item.action ? `<div class="brand-marquee-action">${item.action}</div>` : ''}
            </a>`;
        })
        .join("")
}
export function createMrq2(config) {
    try {
        let mrqs = `
          <div class="brand-marquee-container">
          <div class="brand-marquee-list">
              ${createItems(config)}
          </div>    
          </div>    
          `;
        let parent = document.querySelector("script[id='mrqs']").parentNode;
        parent.insertAdjacentHTML("beforeend", mrqs);
        parent.classList.add("mrq-parent");
    } catch (error) {
        console.log(error);
    }
    mrq(`.brand-marquee-container > .brand-marquee-list`, config.speed)
}