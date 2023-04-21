import type { HTMLInputCheckbox } from "../../fancycanvas/canvasAnimation";
import { getRootComputedStylePropertyValue } from "../../../util/DOMelements";

type DOMStash = {
    [name: string]: HTMLElement & HTMLInputCheckbox
}

function animateHeaderHiding(headerElement: HTMLElement, translateY_N_pixels: number | string, ignoreAnimationCondition: () => boolean) {
    let lastScrollPositionY = 0;
    let isHeaderHidden = false;

    window.addEventListener("scroll", (event) => {
        if (window.scrollY > lastScrollPositionY) {
            lastScrollPositionY = window.scrollY
            console.log("scrolling down")
            if (!isHeaderHidden && !ignoreAnimationCondition()) {
                headerElement.style["transform"] = `translateY(-${translateY_N_pixels})`;
                isHeaderHidden = true;
            }
        } else {
            lastScrollPositionY = window.scrollY
            console.log("scrolling up")
            if (isHeaderHidden) {
                headerElement.style["transform"] = "translateY(0px)"
                isHeaderHidden = false
            }
        }
    })
}

export {
    animateHeaderHiding
}