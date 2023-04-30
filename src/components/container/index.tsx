import { ReactNode, CSSProperties, useEffect } from "react"
import { createElement } from "react"

type InlineStyle = CSSProperties | { [cssproperty: string]: string }

type ContainerProperties = {
    rootElement: string
    children?: ReactNode
    style?: InlineStyle
    id?: string,
    className?: string,
    effectAttachedOnce?: React.EffectCallback
}

type NewContainerProperties = Omit<ContainerProperties, "rootElement">

function Container({ rootElement, children, style, id, className, effectAttachedOnce }: ContainerProperties) {
    !!effectAttachedOnce && useEffect(effectAttachedOnce, [])

    return createElement(rootElement, { id: id, style: style, className: className }, children)
}

export default Container

export type {
    ContainerProperties,
    NewContainerProperties
}