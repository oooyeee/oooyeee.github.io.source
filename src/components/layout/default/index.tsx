import Header from "../header"
import Footer from "../footer"
import { Fragment, ReactNode, useEffect } from "react"

import LanguageMenu from "../../languageMenu"
import ButtonsMenu from "../../buttonsMenu"
import NavigationMenu from "../../navigationMenu"
import GoToTopButton from "../../goToTopButton"

import styles from "./index.sv.gen.json"
import About from "../../about"
import Contacts from "../../contacts"
import FootCopyright from "../../footCopyright"

function DefaultLayout({ children }: { children: ReactNode }) {
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