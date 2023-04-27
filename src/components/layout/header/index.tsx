import type { ContainerProperties, NewContainerProperties } from "../../container"
import Container from "../../container"

import { animateHeaderHiding } from "./headerAnimation"
import { uiState } from "../../../constants"
import styles from "./index.sv.gen.json"

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

    return Container({
        ...containerProps,
        ...{
            rootElement: "header",
            className: (containerProps.className ? containerProps.className + " " : "") + styles.header,
            effectAttachedOnce: () => {
                let header: HTMLElement = document.querySelector(`.${styles.header}`)
                console.log("attached to header." + styles.header)
                animateHeaderHiding(header, 44, stopHeaderHidingOnScrollCondition)
            }
        }
    })
}


export default Header