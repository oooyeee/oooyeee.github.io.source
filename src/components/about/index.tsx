
import { useEffect } from "react"
import style from "./index.sv.gen.json"

import TerminalConsole from "../terminalText";
import { terminalConsoleContainerId } from "../terminalText/constants";

type AboutProperties = {
    id?: string
}

function About({ id }: AboutProperties) {

    return (<section id={id ?? "about"} className={style.about}>
        <h3>About me</h3>
        <div className={style.terminal}>
            <div className={style.terminalHeader}>
                <span className={style.terminalTitle}>/home/users/yaroslav</span>
                <ul className={style.terminalButtons}>
                    <li>_</li>
                    <li>□</li>
                    <li>x</li>
                </ul>
            </div>
            <div className={style.terminalConsole} id={terminalConsoleContainerId}>
                <TerminalConsole />
            </div>
        </div>
    </section>)
}


export default About
