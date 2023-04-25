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


type Hydration = {
    title: string
    projectCatalog?: ProjectDetails[]
}

let hydration: Hydration = {
    title: "yaro.pt"
}

addProjects(hydration)


// ====================================================
export {
    appRoot,
    backgroundRoot,
    ssr_json,
    uiState,
    hydration
}
export type {
    Hydration,
    ProjectDetails
}