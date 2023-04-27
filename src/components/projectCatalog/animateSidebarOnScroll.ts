

function animateSidebarOnScroll(
    stickySidebar: HTMLElement,
    translateY_N_pixels: number | string) {
    //=============================================================
    let lastScrollPositionY = 0;
    let isPushedDown = false;

    window.addEventListener("scroll", (event) => {
        if (window.scrollY > lastScrollPositionY) {
            lastScrollPositionY = window.scrollY
            if (!isPushedDown) {
                stickySidebar.style["top"] = "0px"
                isPushedDown = true;
            }
        } else {
            lastScrollPositionY = window.scrollY
            if (isPushedDown) {
                stickySidebar.style["top"] = `${translateY_N_pixels}px`;
                isPushedDown = false
            }
        }
    })
}

export {
    animateSidebarOnScroll
}