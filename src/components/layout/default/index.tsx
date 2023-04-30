import Header from "../header"
import Footer from "../footer"
import { Fragment, ReactNode, useEffect, useRef } from "react"
import type { FocusEventHandler } from "react"

import LanguageMenu from "../../languageMenu"
import ButtonsMenu from "../../buttonsMenu"
import NavigationMenu from "../../navigationMenu"
import GoToTopButton from "../../goToTopButton"

import styles from "./index.sv.gen.json"
import About from "../../about"
import Contacts from "../../contacts"
import FootCopyright from "../../footCopyright"

import { uiState } from "../../../constants"
import type { HTMLInputCheckbox } from "../../fancycanvas/canvasAnimation"
import CloseHeaderMenus from "../../closeHeaderMenus"

function DefaultLayout({ children }: { children: ReactNode }) {

    let isAnyMenuOpenedRef = useRef(false)

    const onfocusMain: FocusEventHandler<HTMLElement> = (ev) => {
        // let main: HTMLElement = mainRef.current

        console.log("focusing main");
        ; (document.getElementById(uiState.checkboxesIDs.language) as HTMLInputCheckbox).checked = false;
        ; (document.getElementById(uiState.checkboxesIDs.navigation) as HTMLInputCheckbox).checked = false;
    }

    return (<div className={`wrapper ${styles.defaultLayout}`}>
        <Header id="header-container">
            <LanguageMenu></LanguageMenu>
            <ButtonsMenu></ButtonsMenu>
            <NavigationMenu></NavigationMenu>
        </Header>
        <main>
            {children}
        </main>
        <Footer id="footer-container">
            <About />
            <Contacts />
            <FootCopyright />
        </Footer>
        <GoToTopButton />
    </div>)
}

export default DefaultLayout