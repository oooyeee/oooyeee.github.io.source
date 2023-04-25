import { hydrateRoot } from "react-dom/client"
import { HydratableApp } from "..";
import Background from "../../components/layout/background";
import { appRoot, backgroundRoot } from "../../constants";
import getHydration from "./getHydration";


type DOMNodes = {
    appRoot?: Element
    backgroundRoot?: Element
}

let DOM: DOMNodes = {}

window.addEventListener("load", () => {
    // let outerHeight = window.outerHeight + "px"
    // document.documentElement.style.setProperty('--outerHeight', outerHeight);
    // console.log("fixed outer height");
})

function wrapTry(fn: () => void) {
    try {
        fn();
    } catch (err) {
        console.error(err);
    }

}


wrapTry(() => {
    DOM["appRoot"] = document.querySelector(`.${appRoot}`)
    console.log("GOT HYDRATION", getHydration())
    hydrateRoot(DOM["appRoot"], <HydratableApp hydration={getHydration()} />)
})

wrapTry(() => {
    DOM["backgroundRoot"] = document.querySelector(`.${backgroundRoot}`)
    hydrateRoot(DOM["backgroundRoot"], <Background />)
})
