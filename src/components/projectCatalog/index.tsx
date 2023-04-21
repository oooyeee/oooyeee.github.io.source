import type { Dispatch, MouseEventHandler } from "react"
import { Suspense, useState } from "react"
import { useEffect } from "react"
import EE from "../../util/browserEventEmitter"
import delay from "../../util/delay"
import genID from "../../util/generateID"
import { isClient, isServer } from "../../util/isEnvironment"
import type { CatalogItemProps } from "../catalogItem"
import CatalogItem from "../catalogItem"


import style from "./index.sv.gen.json"

type ProjectCatalogProps = {
    jsonArray?: CatalogItemProps[],
}

function ProjectCatalog({ jsonArray }: ProjectCatalogProps) {

    const [catalogItemsInView, set_catalogItemsInView] = useState(null)

    const onHover: MouseEventHandler = (ev) => {
        console.log(["hovered at: ", ev.target["innerHTML"]])
    }

    const Sidebar = () => (<div className={style.sidebar}>
        <label className={style.sidebar + "__filter"} id={style.sidebar + "__filter"}>
            <span>filter:</span>
            <input type="text" className={style.sidebar + "__filter__input"} placeholder="type" />
        </label>
        <ul className={style.sidebar + "__list"}>
            <li onMouseEnter={onHover}>My Project 1</li>
            <li onMouseEnter={onHover}>My Project 2</li>
            <li onMouseEnter={onHover}>My Project 3</li>
            <li onMouseEnter={onHover}>My Project 4</li>
            <li onMouseEnter={onHover}>My Project 5</li>
        </ul>
        <div className={style.sidebar + "__button-expand-list"}>more...</div>
    </div>)


    const LoadingItem = () => CatalogItem({
        json: {
            header: "My First Project",
            image: undefined,
            title: "tech used asd asd asdasd asdasd asdasd asdasd zzzzzz",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit." +
                "Animi laborum vero quaerat quam delectus dolore sed dolorum quibusdam laudantium ullam nobis " +
                "deserunt, deleniti consequatur corporis? asdasd asdasd asdasdasd sad sad asdasdasd " +
                "dddddddddddd ddddddddddddd ddddddddddd",
            links: {
                live: "https://oooyeee.github.io",
                source: "https://github.com/oooyeee"
            }
        }
    })


    const CatalogItemArea = () => (<div className={style.itemArea}>
        <ul>
            <LoadingItem />
        </ul>
    </div>)


    const Result = () => {
        return (<div className={style.projectCatalog}>
            <Sidebar />
            <CatalogItemArea />
        </div>)
    }

    // Suspense ?
    return (<Result />)

}

export default ProjectCatalog