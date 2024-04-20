window.addEventListener("load", (event) => {
    $(".PopupSlides.bottom> a:gt(0)").hide();
    $(".PopupSlides.bottom > a:first").slideDown(500).next().slideUp(500).end().appendTo(".PopupSlides.bottom");
    setInterval(function () {
        $(".PopupSlides.bottom > a:first").slideDown(500).next().slideUp(500).end().appendTo(".PopupSlides.bottom")
    }, 3000)

    const xs = document.querySelectorAll(".popup > .close-popup");
    xs.forEach((x) => {
        x.addEventListener("click", xe, !1);
        function xe(ev) {
            ev.preventDefault();
            this.parentElement.remove()
        }
    })
});