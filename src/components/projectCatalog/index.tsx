import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useMemo } from "react"
import { Suspense, useState, memo } from "react"
import { useEffect, useRef } from "react"
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
import { animateSidebarOnScroll } from "./animateSidebarOnScroll"

import EE from "../../util/browserEventEmitter"
import { useDebounce } from "../../util/hooks/useDebounce"
// import { EE } from "../../util/browserEventEmitter"

type ProjectCatalogProps = {
    jsonArray?: CatalogItemProps[],
}

type SidebarProps = ProjectCatalogProps & {
    // setIndex: Dispatch<SetStateAction<number>>
    isClickedMore: boolean
    ee: EE
}

const SidebarList = memo(({ jsonArray, isClickedMore, ee }: SidebarProps) => {

    const onItemClick = (index: number) => {
        // setIndex(index)
        ee.emit("index", index)
    }

    const Li = ({ text, index }: { text: string, index: number }) => (
        // <li onClick={() => { onItemClick(index) }}>{text}</li>
        <li onClick={() => { onItemClick(index) }}>
            <a href={`#${styleof_CatalogItem.catalogItem}_${index}`}>{text}</a>
        </li>
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
    ee: EE
}

const CatalogItemArea = memo(({ jsonArray, ee }: CatalogItemAreaProps) => {
    const mqBreakPoint = useMemo(() => { // compute once, bc i will not change --cardsMediaBreakpoint
        const documentRootStyle = typeof (document) !== "undefined" && getComputedStyle(document.documentElement)
        const mqBreakPoint = !!documentRootStyle && documentRootStyle.getPropertyValue('--cardsMediaBreakpoint2')
        return mqBreakPoint
    }, [])

    const matchesBreakPoint = () => { // ??
        let matchesMQ = window.matchMedia(`(max-width: ${mqBreakPoint})`).matches
        return matchesMQ
    }

    const smallMax = 1
    const bigMax = 3
    const giveCardsNumber = () => matchesBreakPoint() ? smallMax : bigMax

    // @TODO on resize, check media query, if small width set to 1 if wide width set to 3
    const [maxPerPage, set_maxPerPage] = useState(bigMax)

    const ccNref = useRef(bigMax) // ccNref.current is tracked in useEffect
    const [currentCardsNumber /*this variable is only for render*/, set_currentCardsNumberForRender] = useState(ccNref.current)

    const set_currentCardsNumber = (num: number) => { // updates current number
        ccNref.current = num // updated here for tracking
        set_currentCardsNumberForRender(num) // updated here for render
    }

    useEffect(() => {
        let ul: HTMLUListElement = document.querySelector(`.${style.itemArea}`)
        let initCardsNumber = giveCardsNumber()
        set_maxPerPage(initCardsNumber)
        set_currentCardsNumber(initCardsNumber)
        window.addEventListener("resize", (ev) => {
            initCardsNumber = giveCardsNumber()
            set_maxPerPage(initCardsNumber)
        })

        // ================== ee =================
        ee.on("index", (inputIndex: string) => {
            console.log(`>>> sidebar input: ${inputIndex}`)
            let inputNum = parseInt(inputIndex)
            if (inputNum >= ccNref.current) {
                let ncNum = getNextCardsNumber(inputNum)
                console.log(`>>> current: ${ccNref.current} -- nextCardsNum: ${ncNum}`);
                set_currentCardsNumber(ncNum)
            }
        })

    }, []);

    const getNextCardsNumber = useCallback((currentCardsNumber: number) => {
        let cardnum = currentCardsNumber + maxPerPage
        console.log("calculating cardnum: " + cardnum)
        if (cardnum > jsonArray.length) {
            cardnum = jsonArray.length
        }

        return cardnum
    }, [currentCardsNumber])

    const onClickHandler: MouseEventHandler<HTMLDivElement | HTMLLIElement> = (ev) => {
        ev.preventDefault()
        let cardnum = getNextCardsNumber(currentCardsNumber)
        set_currentCardsNumber(cardnum)
    }


    const ShowCards = () => {
        let maxCards = bigMax;

        if (typeof maxPerPage !== "undefined" && typeof currentCardsNumber !== "undefined") {
            maxCards = currentCardsNumber > maxPerPage ? currentCardsNumber : maxPerPage
        }
        console.log(">>> max cards on render: " + maxCards)
        let arr = [];
        let i = 0;
        for (; i < maxCards; i++) {
            let item = jsonArray[i];
            if (!item) break;
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

        jsonArray.length > maxCards && arr.push(<EmptyCatalogItem
            elementType="li"
            header="...more"
            key={i}
            keyId={i}
            onClickHandler={onClickHandler}
        ></EmptyCatalogItem>)

        return arr
    }

    return (
        <ul className={style.itemArea + " itemArea"}
            style={{

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

    const getItemsFromInputValue = (inputValue: string) => {
        const filteredItems = jsonArray.filter((item) =>
            item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.tech.toLowerCase().includes(inputValue.toLowerCase()) ||
            item.description.toLowerCase().includes(inputValue.toLowerCase())
        );

        return filteredItems
    }

    const onInputTextChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
        const inputValue = ev.target.value;
        const filteredItems = getItemsFromInputValue(inputValue)
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
                {/* <path d="M 2,5 L 5,7"></path><path d="M 8,5 L 5,7"></path> */}
                <path></path>
                <path></path>
            </svg>
            <span className={style.sidebar + "__showFilterSwitch__text-show"}>show filter</span>
            <span className={style.sidebar + "__showFilterSwitch__text-hide"}>hide filter</span>
        </label>
    )
}




function ProjectCatalog({ jsonArray }: ProjectCatalogProps) {
    const [isClickedMore, set_isClickedMore] = useState(false)
    const [debouncedValue, set_itemsList] = useDebounce(jsonArray, 500)

    // event emitter is used to avoid rerenderings
    const ee = useRef(new EE({
        enableDebugErrorMessages: true,
        // maxListeners: 1
    }))

    useEffect(() => {
        let sidebarSticky: HTMLElement = document.querySelector(`.${style.sidebar + "__stickytrack"}`)
        console.log(":: HERE ::");

        console.log(sidebarSticky)
        animateSidebarOnScroll(sidebarSticky, 48)
    }, [])

    return (
        <div className={style.projectCatalog}>
            <div className={style.sidebar}>
                <div className={style.sidebar + "__stickytrack"}>
                    <FilterLabelSVG_for_filter_checkbox />
                    <label className={style.sidebar + "__filter"} id={style.sidebar + "__filter"}>
                        <span>filter:</span>
                        <InputLine setItemsList={set_itemsList} jsonArray={jsonArray} />
                    </label>
                    <ul className={style.sidebar + "__list"}>
                        <SidebarList
                            jsonArray={debouncedValue}
                            // setIndex={set_catalogItemInView}
                            ee={ee.current}
                            isClickedMore={isClickedMore} />
                    </ul>
                    <ButtonClickMore
                        isClickedMore={isClickedMore}
                        set_isClickedMore={set_isClickedMore} />
                </div>
            </div>
            <CatalogItemArea
                jsonArray={debouncedValue}
                // itemIndex={catalogItemInView ?? 0}
                ee={ee.current} />
        </div>
    );
}

export default ProjectCatalog
