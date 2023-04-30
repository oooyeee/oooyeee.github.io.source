import type { ContainerProperties, NewContainerProperties } from "../../container"
import Container from "../../container"

import { animateHeaderHiding } from "./headerAnimation"
import { uiState } from "../../../constants"
import styles from "./index.sv.gen.json"
import CloseHeaderMenus from "../../closeHeaderMenus"
import { useRef } from "react"
import type { MutableRefObject } from "react"

function Header(containerProps: NewContainerProperties) {
    let stopHeaderHidingOnScrollCondition: () => boolean;

    if (typeof window !== "undefined") { // client code
        let checkboxes = {
            language: document.getElementById(uiState.checkboxesIDs.language) as HTMLInputElement,
            navigation: document.getElementById(uiState.checkboxesIDs.navigation) as HTMLInputElement
        }

        stopHeaderHidingOnScrollCondition = () => {
            return (checkboxes.language.checked || checkboxes.navigation.checked)
        }

    } else { // server code
        stopHeaderHidingOnScrollCondition = () => false
    }

    return (<header className={styles.headerWrapper}>
        {Container({
            ...containerProps,
            ...{
                rootElement: "div",
                className: (containerProps.className ? containerProps.className + " " : "") + styles.header,
                effectAttachedOnce: () => {
                    let header: HTMLElement = document.querySelector(`.${styles.header}`)
                    console.log("attached to header." + styles.header)
                    animateHeaderHiding(header, 44, stopHeaderHidingOnScrollCondition)
                }
            }
        })}
        <CloseHeaderMenus></CloseHeaderMenus>
    </header>)
}


export default Header