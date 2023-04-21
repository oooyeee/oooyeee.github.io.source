import type { ContainerProperties, NewContainerProperties } from "../../container"
import Container from "../../container"

import styles from "./index.sv.gen.json"

function Footer(containerProps: NewContainerProperties) {
    return Container({...containerProps, ...{rootElement: "footer", className: (containerProps.className ? containerProps.className + " " : "") + styles.footer}})
}


export default Footer