import type { ContainerProperties, NewContainerProperties } from "../../container"
import Container from "../../container"

import styles from "./index.sv.gen.json"

function Header(containerProps: NewContainerProperties) {
    return Container({...containerProps, ...{rootElement: "header", className: (containerProps.className ? containerProps.className + " " : "") + styles.header}})
}


export default Header