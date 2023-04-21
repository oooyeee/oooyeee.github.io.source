import type { HTMLInputCheckbox } from "./canvasAnimation";
import { canvasAnimation } from "./canvasAnimation";
import { useEffect } from "react"

import style from "./index.sv.gen.json"

function FancyCanvas({ play }: { play?: boolean }) {

    let canvasID = "fancyCanvas"

    useEffect(() => {
        // ATTACH interactivity
        let thisCanvas = document.querySelector(`#${canvasID}`)
        let animationSwitch = document.querySelector("#checkbox--animation-switch") as HTMLInputCheckbox
        let fireworksSwitch = document.querySelector("#checkbox--fireworks-switch") as HTMLInputCheckbox

        ;!!play && canvasAnimation(thisCanvas as HTMLCanvasElement, animationSwitch, fireworksSwitch)
    }, [])

    return (<canvas id={canvasID} className={style.fancyCanvas}></canvas>)
}

export default FancyCanvas