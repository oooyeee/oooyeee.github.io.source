import FancyCanvas from "../../fancycanvas"
import style from "./index.sv.gen.json"

function Background() {
    return (<div id="canvas-background" className={style.canvasBackground}>
        <FancyCanvas play={true} />
    </div>)
}


export default Background