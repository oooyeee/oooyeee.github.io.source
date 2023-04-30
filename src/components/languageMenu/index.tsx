import type { MutableRefObject } from "react"
import style from "./index.sv.gen.json"

const checkBoxId = "checkbox--lang"

type LanguageMenuProps = {
    ref?: MutableRefObject<any>
}

function LanguageMenu() {
    return (<div className={style.languageMenu}>
        <label htmlFor={checkBoxId}>
            <span>EN</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" style={{ stroke: "white", strokeWidth: 1, strokeLinecap: "round" }}>
                <path d="M 2,5 L 5,7"></path>
                <path d="M 8,5 L 5,7"></path>
            </svg>
        </label>
        <ul className="languageList">
            <li>russian</li>
            <li>english</li>
            <li>portuguese</li>
        </ul>
    </div>)
}

export default LanguageMenu