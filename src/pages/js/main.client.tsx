import type { Root } from "react-dom/client"
import type { HTMLInputCheckbox } from "../../components/fancycanvas/canvasAnimation"
import { hydrateRoot, createRoot } from "react-dom/client"

import FancyCanvas from "../../components/fancycanvas"

import { animateHeaderHiding } from "../../components/layout/header/headerAnimation"
import BusinessCard from "../../components/businessCard"
import ProjectCatalog from "../../components/projectCatalog"
import CatalogItem from "../../components/catalogItem"
import TerminalConsole from "../../components/terminalText"
import { terminalConsoleContainerId } from "../../components/terminalText/constants"

window.addEventListener("load", () => {
    // let outerHeight = window.outerHeight + "px"
    // document.documentElement.style.setProperty('--outerHeight', outerHeight);
    // console.log("fixed outer height");
})

try {

    type DOM_elms = {
        ui_state_checkboxes?: {
            language?: HTMLInputCheckbox,
            navigation?: HTMLInputCheckbox,
            bgAnimation?: HTMLInputCheckbox,
            bgFireworks?: HTMLInputCheckbox,
        },
        header?: HTMLElement,
        footer?: HTMLElement,
        "section.businessCard"?: HTMLElement,
        "section.Projects"?: HTMLElement,
        terminalConsoleTextContainer?: HTMLElement
    }

    let DOM: DOM_elms = {}

    let hydration_JSON = JSON.parse(document.querySelector("#SSR_JSON").innerHTML)
    // console.log(hydration_JSON)
    let uiContainer = document.querySelector(".approot")
    let dummyContainer = document.querySelector("#dummyIsle")
    let backgroundCanvasContainer = document.querySelector("#canvas-background")
    // console.log(defaultContainer);
    // console.log(":: hydration ended ::")

    DOM["ui_state_checkboxes"] = {
        "language": document.querySelector("#checkbox--lang"),
        "navigation": document.querySelector("#checkbox--nav"),
        "bgAnimation": document.querySelector("#checkbox--animation-switch"),
        "bgFireworks": document.querySelector("#checkbox--fireworks-switch")
    }
    DOM["header"] = document.querySelector("header")

    animateHeaderHiding(DOM["header"], "44px", () => {
        return DOM["ui_state_checkboxes"].language.checked || DOM["ui_state_checkboxes"].navigation.checked
    })

    hydrateRoot(backgroundCanvasContainer, <FancyCanvas play={true} />);

    try {
        DOM["section.businessCard"] = document.querySelector("section#businessCard")
        hydrateRoot(DOM["section.businessCard"], <BusinessCard />)
    } catch (err) {
        console.error(err);
    }

    DOM["section.Projects"] = document.querySelector("section#projects")

    // hydrateRoot(DOM["section.Projects"], <ProjectCatalog key="0001" jsonArray={[{json: {header:"TBA", image:"/hello.jpeg", title:"TECH", text:"lorem ipsum", links:{live: "https://google.com", source: "https://google.com"}, key:"1234567"}}]}/>)

    hydrateRoot(DOM["section.Projects"], <ProjectCatalog />)

    // let root = createRoot(DOM["section.Projects"])
    // root.render(<ProjectCatalog json={[{header:"TBA", image:"/hello.jpeg", title:"TECH", text:"lorem ipsum", links:{live: "https://google.com", source: "https://google.com"}, key:"1234567"}]}/>)

    DOM["terminalConsoleTextContainer"] = document.querySelector("#" + terminalConsoleContainerId)

    hydrateRoot(DOM["terminalConsoleTextContainer"], <TerminalConsole />)

} catch (err) {
    console.error(err);
}

