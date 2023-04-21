
import { createElement } from "react"
import style from "./index.sv.gen.json"

export type CatalogItemProps = {
    json: {
        header?: string
        image?: string
        title?: string //tech
        text?: string
        links?: {
            live: string
            source: string
        }
    },
    key?: string,
    elementType?: "div" | "li"
}


function CatalogItem({ json: { header, image, title, text, links }, key, elementType }: CatalogItemProps) {
    let content = (<>
        <h3 className={style.catalogItem + "__header"}>{header}</h3>
        <div className={style.catalogItem + "__image"} style={image ? { background: `url(${image})`} : {background: "rgba(0,0,0,0.4)"}}></div>
        <h4 className={style.catalogItem + "__title"}>{title}</h4>
        <p className={style.catalogItem + "__text"}><span>{text}</span></p>
        <div className={style.catalogItem + "__links"}>
            {links.live && <a href={links.live} className={style.catalogItem + "__links__live"}><svg><use xlinkHref="/assets/icons.svg#play"></use></svg><span>Live</span></a>}
            {links.source && <a href={links.source} className={style.catalogItem + "__links__source"}><svg><use xlinkHref="/assets/icons.svg#github"></use></svg><span>Source</span></a>}
        </div>
    </>)

    let el = createElement(elementType ?? "li", { className: style.catalogItem, key: key }, content)

    return el
}

export default CatalogItem