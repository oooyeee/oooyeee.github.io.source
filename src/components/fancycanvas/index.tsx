import type { HTMLInputCheckbox } from "./canvasAnimation";
import { canvasAnimation } from "./canvasAnimation";
import { useEffect } from "react"

import { uiState } from "../../constants";

import style from "./index.sv.gen.json"


function FancyCanvas({ play }: { play?: boolean }) {

    let canvasID = "fancyCanvas"

    useEffect(() => {
        // ATTACH interactivity
        let thisCanvas = document.querySelector(`#${canvasID}`)
        console.log("canvas: ", thisCanvas)
        let animationSwitch = document.querySelector(`#${uiState.checkboxesIDs.animationVisibility}`) as HTMLInputCheckbox
        let fireworksSwitch = document.querySelector(`#${uiState.checkboxesIDs.fireworks}`) as HTMLInputCheckbox

        console.log(animationSwitch, fireworksSwitch)

        ;!!play && canvasAnimation(thisCanvas as HTMLCanvasElement, animationSwitch, fireworksSwitch)
    }, [])

    return (<canvas id={canvasID} className={style.fancyCanvas}></canvas>)
}

export default FancyCanvas