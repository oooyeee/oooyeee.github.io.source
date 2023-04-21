import type { LinkHTMLAttributes, FC, ButtonHTMLAttributes } from "react"

import style from "./index.sv.gen.json"

function GoToTopButton() {
    const onClickHandler = () => {
        console.log("BUTTON PRESSED")
    }

    return (<button className={style.goToTopButton} aria-label="go to top button" onClick={() => onClickHandler()}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
            <path d="M 2,6 L 5,3"></path>
            <path d="M 8,6 L 5,3"></path>
        </svg>
    </button>)
}

export default GoToTopButton