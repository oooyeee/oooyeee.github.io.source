import type { ContainerProperties, NewContainerProperties } from "../../container"
import Container from "../../container"

import { animateHeaderHiding } from "./headerAnimation"

import styles from "./index.sv.gen.json"

function Header(containerProps: NewContainerProperties) {
    return Container({
        ...containerProps,
        ...{
            rootElement: "header",
            className: (containerProps.className ? containerProps.className + " " : "") + styles.header,
            effectAttachedOnce: () => {
                let header: HTMLElement = document.querySelector(`.${styles.header}`)
                console.log("attached to header." + styles.header)
                animateHeaderHiding(header, 44)
            }
        }
    })
}


export default Header