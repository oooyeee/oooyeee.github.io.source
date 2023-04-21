import type { ContainerProperties, NewContainerProperties } from "../../container"
import Container from "../../container"

import styles from "./index.sv.gen.json"


function Section(containerProps: NewContainerProperties) {
    return Container({...containerProps, ...{rootElement: "section", className: (containerProps.className ? containerProps.className + " " : "") + styles.section}})
}


export default Section