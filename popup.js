window.addEventListener("load", (event) => {
    $(".PopupSlides> a:gt(0)").hide();
    $(".PopupSlides > a:first").slideDown(500).next().slideUp(500).end().appendTo(".PopupSlides");
    setInterval(function () {
        $(".PopupSlides > a:first").slideDown(500).next().slideUp(500).end().appendTo(".PopupSlides")
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