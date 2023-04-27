
import { createElement, useEffect } from "react"

import style from "./index.sv.gen.json"

import type { MouseEventHandler } from "react"
import type { ProjectDetails } from "../../constants"

export type CatalogItemProps = ProjectDetails & {
    keyId?: number,
    elementType?: "div" | "li"
    isFocussed?: boolean,
    addStyles?: React.CSSProperties
}



function CatalogItem({ name, description, tech, urls, elementType, keyId, isFocussed = false, addStyles = {}}: CatalogItemProps) {
    let content = (<>
        <h3 className={style.catalogItem + "__header"}>{name}</h3>
        <div className={style.catalogItem + "__image"} style={urls.image ? { background: `url(${urls.image})` } : { background: "rgba(0,0,0,0.4)" }}></div>
        <h4 className={style.catalogItem + "__title"}>{tech}</h4>
        <p className={style.catalogItem + "__text"}><span>{description}</span></p>
        <div className={style.catalogItem + "__links"}>
            {urls.live && <a href={urls.live} className={style.catalogItem + "__links__live"}><svg><use xlinkHref="/assets/icons.svg#play"></use></svg><span>Live</span></a>}
            {urls.source && <a href={urls.source} className={style.catalogItem + "__links__source"}><svg><use xlinkHref="/assets/icons.svg#github"></use></svg><span>Source</span></a>}
        </div>
    </>)

    let el = createElement(elementType ?? "li", {
        // className:  isSelected ? (style.catalogItem + " " + style["catalogItem--selected"]) : style.catalogItem,
        className:  style.catalogItem,
        key: keyId,
        id: `${style.catalogItem}_${keyId}`,
        style: addStyles
    }, content)

    useEffect(()=>{
        console.log(":: rendering item: ", keyId)   
    })

    return el
}

function EmptyCatalogItem({ elementType, keyId, header = "...more", addClassName = style["catalogItem--empty"], onClickHandler }: Omit<CatalogItemProps, "tech" | "description" | "urls" | "name"> & { onClickHandler: MouseEventHandler<HTMLLIElement | HTMLDivElement>, header?: string, addClassName?: string }) {
    let content = (<>
        <h3 className={style.catalogItem + "__header"}>{header}</h3>
        <div className={style.catalogItem + "__image"} style={{ background: "rgba(0,0,0,0.4)" }}></div>
        <h4 className={style.catalogItem + "__title"}>...</h4>
        <p className={style.catalogItem + "__text"}><span>...</span></p>
        <div className={style.catalogItem + "__links"}></div>
    </>)

    let el = createElement(
        elementType ?? "li", {
        className: `${style.catalogItem} ${addClassName}`,
        key: keyId,
        id: `${style.catalogItem}_${keyId}`,
        style: { opacity: "0.75", cursor: "pointer" },
        onClick: onClickHandler
    },
        content
    )

    return el
}

export default CatalogItem

export {
    EmptyCatalogItem
}