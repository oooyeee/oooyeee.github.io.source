import { hydrateRoot } from "react-dom/client"
import { ResumeHydratableApp } from "../resume";
import { appRoot } from "../../constants";
import getHydration from "./getHydration";


type DOMNodes = {
    appRoot?: Element
    backgroundRoot?: Element
}

let DOM: DOMNodes = {}

function wrapTry(fn: () => void) {
    try {
        fn();
    } catch (err) {
        console.error(err);
    }

}

wrapTry(() => {
    DOM["appRoot"] = document.querySelector(`.${appRoot}`)
    hydrateRoot(DOM["appRoot"], <ResumeHydratableApp hydration={getHydration()} />)
})