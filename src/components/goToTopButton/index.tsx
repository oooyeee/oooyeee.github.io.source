import { LinkHTMLAttributes, FC, ButtonHTMLAttributes, useEffect } from "react"

import style from "./index.sv.gen.json"

function GoToTopButton() {

    useEffect(() => {
        // @TODO attach intersection observer
        const thisButton: HTMLLinkElement = document.querySelector(`.${style.goToTopButton}`)

        let addedHiddenClass = false

        const intersectionCb: IntersectionObserverCallback = (entries, observer) => {
            entries.forEach((entry)=>{
                if(entry.isIntersecting) {
                    console.log(":: more than 40% is visible ::")
                    addedHiddenClass && thisButton.classList.remove(`${style.goToTopButton}__hidden`)
                } else {
                    console.log(":: LESS than 40% is visible  ::")
                    thisButton.classList.add(`${style.goToTopButton}__hidden`)
                    addedHiddenClass = true
                }
            })
        }

        const observerOptions: IntersectionObserverInit = {
            root: null,
            threshold: 0.4
        }

        let observer = new IntersectionObserver(intersectionCb, observerOptions)

        let target = document.getElementById("businessCard")

        observer.observe(target)

    }, [])

    return (<a href="#businessCard" className={style.goToTopButton} aria-label="go to top button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
            <path d="M 2,6 L 5,3"></path>
            <path d="M 8,6 L 5,3"></path>
        </svg>
    </a>)
}

export default GoToTopButton