import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useMemo } from "react"
import { Suspense, useState, memo } from "react"
import { useEffect, useRef } from "react"
import EE from "../../util/browserEventEmitter"
import delay from "../../util/delay"
import Throttler from "../../util/throttler"
import genID from "../../util/generateID"
import { isClient, isServer } from "../../util/isEnvironment"
import { CatalogItemProps, EmptyCatalogItem } from "../catalogItem"
import CatalogItem from "../catalogItem"

import style from "./index.sv.gen.json"

import styleof_CatalogItem from "../catalogItem/index.sv.gen.json"
import Debouncer from "../../util/debouncer"
import { uiState } from "../../constants"

type ProjectCatalogProps = {
    jsonArray?: CatalogItemProps[],
}

type SidebarProps = ProjectCatalogProps & {
    setIndex: Dispatch<SetStateAction<number>>
    isClickedMore: boolean
}

const SidebarList = memo(({ jsonArray, setIndex, isClickedMore }: SidebarProps) => {

    const onItemClick = (index: number) => {
        setIndex(index)
    }

    const Li = ({ text, index }: { text: string, index: number }) => (
        <li onClick={() => { onItemClick(index) }}>{text}</li>
    )

    return (<>
        {isClickedMore ? (
            jsonArray.map((item, index) => {
                return (<Li text={item.name} index={index} key={index} />)
            })
        ) : (
            (() => {
                let maxItems = jsonArray.length > 5 ? 5 : jsonArray.length
                let items = [];
                for (let i = 0; i < maxItems; i++) {
                    items.push(<Li text={jsonArray[i].name} key={i} index={i} />)
                }
                return items
            })()
        )}
    </>)
})

type CatalogItemAreaProps = ProjectCatalogProps & {
    itemIndex: number,
    totalItems: number
}

const CatalogItemArea = memo(({ jsonArray, itemIndex, totalItems }: CatalogItemAreaProps) => {

    // const mqBreakPoint = useMemo(()=>{ // compute once, bc i will not change --cardsMediaBreakpoint
    //     const documentRootStyle = !!document && getComputedStyle(document.documentElement)
    //     const mqBreakPoint = !!documentRootStyle && documentRootStyle.getPropertyValue('--cardsMediaBreakpoint')

    //     return mqBreakPoint // returns string, for example: "818px"
    // }, [])

    // const matchesBreakPoint = () => { // ??
    //     let matchesMQ = window.matchMedia(`(max-width: ${mqBreakPoint})`).matches
    //     return matchesMQ
    // }

    // const smallMax = 1
    // const bigMax = 3

    // const [matchesMediaBreakPoint, set_matchesMediaBreakPoint] = useState(matchesBreakPoint())
    // const [maxPerPage, set_maxPerPage] = useState(matchesMediaBreakPoint ? smallMax : bigMax)


    // useEffect(() => {
    //     let ul: HTMLUListElement = document.querySelector(`.${style.itemArea}`)

    //     const matchesBreakPoint = () => { // ??
    //         console.log(`(max-width: ${mqBreakPoint})`);
            
    //         let matchesMQ = window.matchMedia(`(max-width: ${mqBreakPoint})`).matches
    //         return matchesMQ
    //     }

    //     window.addEventListener("resize", (ev)=>{
    //         console.log("window inner Height: ", window.innerHeight)
    //         console.log("window inner Width: ", window.innerWidth)
    //         set_matchesMediaBreakPoint(matchesBreakPoint())
    //         console.log("matches media: ", matchesMediaBreakPoint)
    //     })
    // }, []);



    const ShowCards = () => {
        const maxPerPage = 3
        let arr = [];
        for (let i = 0; i < maxPerPage; i++) {
            let item = jsonArray[i];
            let index = i
            arr.push(<CatalogItem
                name={item.name}
                tech={item.tech}
                description={item.description}
                urls={item.urls}
                elementType="li"
                key={index}
                keyId={index}
            ></CatalogItem>)
        }

        jsonArray.length > 3 && arr.push(<EmptyCatalogItem
            elementType="li"
            header="...more"
            key={4}
            keyId={4}
            onClickHandler={() => { }}
        ></EmptyCatalogItem>)

        return arr
    }

    return (
        <ul className={style.itemArea + " itemArea"}
            style={{
                // transform: "translateX(0px)",
                // transition: "0.1s"
                // cursor: "pointer"
            }}>
            {ShowCards()}
        </ul>
    );
})

type ButtonClickMoreProps = {
    isClickedMore: boolean
    set_isClickedMore: Dispatch<SetStateAction<boolean>>
}

const ButtonClickMore = ({ isClickedMore, set_isClickedMore }: ButtonClickMoreProps) => {

    const onClickMore = () => {
        set_isClickedMore(!isClickedMore)
    }

    let className = style.sidebar + "__button-expand-list";
    className += isClickedMore ? ` ${className}--clicked` : ""

    return (<>
        <div
            onClick={onClickMore}
            className={className}
        >{isClickedMore ? "less..." : "more..."}</div>
    </>)
}

type InputLineProps = ProjectCatalogProps & {
    setItemsList: Dispatch<SetStateAction<CatalogItemProps[]>>
}

const InputLine = ({ setItemsList, jsonArray }: InputLineProps) => {

    const onInputTextChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
        const inputValue = ev.target.value;
        const filteredItems = jsonArray.filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.tech.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.description.toLowerCase().includes(inputValue.toLowerCase())
        );
        setItemsList(filteredItems);
    }

    return (<>
        <input type="text"
            className={style.sidebar + "__filter__input"}
            placeholder="type"
            onChange={onInputTextChange} />
    </>)
}

const FilterLabelSVG_for_filter_checkbox = () => {
    return (
        <label htmlFor={uiState.checkboxesIDs.filter} className={style.sidebar + "__showFilterSwitch"}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 10"
                style={{
                    stroke: "white", strokeWidth: "1", strokeLinecap: "round"
                }}>
                <path d="M 2,5 L 5,7"></path><path d="M 8,5 L 5,7"></path>
            </svg>
            <span className={style.sidebar + "__showFilterSwitch__text-show"}>show filter</span>
            <span className={style.sidebar + "__showFilterSwitch__text-hide"}>hide filter</span>
        </label>
    )
}

function ProjectCatalog({ jsonArray }: ProjectCatalogProps) {
    const [catalogItemInView, set_catalogItemInView] = useState(0);
    const [isClickedMore, set_isClickedMore] = useState(false)
    const [itemsList, set_itemsList] = useState(jsonArray)

    return (
        <div className={style.projectCatalog}>
            <div className={style.sidebar}>
                <FilterLabelSVG_for_filter_checkbox />
                <label className={style.sidebar + "__filter"} id={style.sidebar + "__filter"}>
                    <span>filter:</span>
                    <InputLine setItemsList={set_itemsList} jsonArray={jsonArray} />
                </label>
                <ul className={style.sidebar + "__list"}>
                    <SidebarList
                        jsonArray={itemsList}
                        setIndex={set_catalogItemInView}
                        isClickedMore={isClickedMore} />
                </ul>
                <ButtonClickMore
                    isClickedMore={isClickedMore}
                    set_isClickedMore={set_isClickedMore} />
            </div>
            <CatalogItemArea
                jsonArray={itemsList}
                itemIndex={catalogItemInView ?? 0}
                totalItems={jsonArray.length} />
        </div>
    );
}

export default ProjectCatalog
