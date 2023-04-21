import { ReactNode, CSSProperties } from "react"
import { createElement } from "react"

type InlineStyle = CSSProperties | { [cssproperty: string]: string }

type ContainerProperties = {
    rootElement: string
    children?: ReactNode
    style?: InlineStyle
    id?: string,
    className?: string
}

type NewContainerProperties = Omit<ContainerProperties, "rootElement">

function Container({ rootElement, children, style, id, className }: ContainerProperties) {
    // return (<RootEl id={id} className={(className ? className + " " : "") + styles.wrapper} style={{...style}}>
    //     {children}
    // </RootEl>)
    return createElement(rootElement, { id: id, style: style, className: className }, children)
}

export default Container

export type {
    ContainerProperties,
    NewContainerProperties
}