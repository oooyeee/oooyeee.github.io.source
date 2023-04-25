import DefaultLayout from "../components/layout/default"
import Background from "../components/layout/background"

import BusinessCard from "../components/businessCard"
import ProjectCatalog from "../components/projectCatalog"

import Intersection from "../components/intersection"

import IndexTemplate from "./__index.template"

import { appRoot, backgroundRoot, uiState } from "../constants"

import { hydration } from "../constants"
import { useEffect } from "react"
import type { Hydration } from "../constants"


function HydratableApp({ hydration }: { hydration: Hydration }) {
    useEffect(() => {
        console.log(":: HYDRATION ::");

        console.log(hydration)
    }, [])

    return (<>
        <DefaultLayout>
            <section id="businessCard">
                <BusinessCard />
            </section>
            <Intersection title="projects" marginTop="-68px" marginBottom="100px" />
            <section id="projects" style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <ProjectCatalog jsonArray={hydration.projectCatalog} />
            </section>
            <Intersection title="about" marginBottom="44px" />
        </DefaultLayout>
    </>)
}

function Page() {
    return (
        IndexTemplate({
            hydration: { ...hydration },
            children: (<>
                <input className="displaynone" type="checkbox" id={uiState.checkboxesIDs.language} />
                <input className="displaynone" type="checkbox" id={uiState.checkboxesIDs.navigation} />
                <input className="displaynone" type="checkbox" id={uiState.checkboxesIDs.animationVisibility} />
                <input className="displaynone" type="checkbox" id={uiState.checkboxesIDs.fireworks} />
                <input className="displaynone" type="checkbox" id={uiState.checkboxesIDs.filter} />
                <div className={backgroundRoot}>
                    <Background />
                </div>
                <div className={appRoot}>
                    <HydratableApp hydration={{ ...hydration }} />
                </div>
            </>)
        })
    )
}

export default Page

export {
    HydratableApp
}