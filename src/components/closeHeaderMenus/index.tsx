
import style from "./index.sv.gen.json"

import type { MutableRefObject, MouseEventHandler } from "react"
import { uiState } from "../../constants"
import { HTMLInputCheckbox } from "../fancycanvas/canvasAnimation"

type CloseHeaderMenusProps = {
    ref: MutableRefObject<any>
}

function CloseHeaderMenus() {

    const onClickHandler: MouseEventHandler<HTMLLabelElement> = (ev) => {
        (document.getElementById(uiState.checkboxesIDs.navigation) as HTMLInputCheckbox).checked = false;
        (document.getElementById(uiState.checkboxesIDs.language) as HTMLInputCheckbox).checked = false;
    }

    return (<label onClick={onClickHandler} className={style.closeHeaderMenus}></label>)
}

export default CloseHeaderMenus