import type { HTMLInputCheckbox } from "../../fancycanvas/canvasAnimation";
import { getRootComputedStylePropertyValue } from "../../../util/DOMelements";

type DOMStash = {
    [name: string]: HTMLElement & HTMLInputCheckbox
}

function animateHeaderHiding(
    headerElement: HTMLElement,
    translateY_N_pixels: number | string,
    shouldDisableHidingConditionCb: () => boolean = () => false) { // true = disable hiding
    //=============================================================
    let lastScrollPositionY = 0;
    let isHeaderHidden = false;

    window.addEventListener("scroll", (event) => {
        if (window.scrollY > lastScrollPositionY) {
            lastScrollPositionY = window.scrollY
            console.log("scrolling down")
            if (!isHeaderHidden && !shouldDisableHidingConditionCb()) {
                headerElement.style["transform"] = `translateY(-${translateY_N_pixels}px)`;
                isHeaderHidden = true;
                console.log("header set to hidden")
            }
        } else {
            lastScrollPositionY = window.scrollY
            console.log("scrolling up")
            if (isHeaderHidden) {
                headerElement.style["transform"] = "translateY(0px)"
                isHeaderHidden = false
                console.log("header set to visible")
            }
        }
    })
}

export {
    animateHeaderHiding
}