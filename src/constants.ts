import { addProjects, ProjectDetails } from "./projects"

const appRoot = "app-root"
const backgroundRoot = "background-root"
const ssr_json = "SSR_JSON"

const uiState = {
    checkboxesIDs: {
        language: "checkbox--lang",
        navigation: "checkbox--nav",
        animationVisibility: "checkbox--animation-switch",
        fireworks: "checkbox--fireworks-switch",
        filter: "checkbox--filter"
    }
}

function getDate() {
    let date = new Date()
    return date.getUTCFullYear() + "/" + date.getUTCMonth() + "/" + date.getDate()
}

//====================================================
type Hydration = {
    title: string
    buildDate: string
    projectCatalog?: ProjectDetails[]
}
let hydration: Hydration = {
    title: "yaro.pt",
    buildDate: getDate()
}
addProjects(hydration)
// ====================================================

function getSSRJson_on_client(): Hydration | {} {
    let json = {}
    if (typeof document === "undefined") {
        return json
    }
    let jsonString: string | HTMLElement = document.getElementById(ssr_json)
    if (jsonString === null) {
        return json
    }
    jsonString = jsonString.innerHTML
    try {
        json = JSON.parse(jsonString)
    } catch (err) {
        console.log(err)
    }
    return json
}

export {
    appRoot,
    backgroundRoot,
    ssr_json,
    uiState,
    hydration,
    getSSRJson_on_client
}
export type {
    Hydration,
    ProjectDetails
}