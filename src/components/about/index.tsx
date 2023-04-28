
import { useEffect } from "react"
import style from "./index.sv.gen.json"

import TerminalConsole from "../terminalText";

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
            <TerminalConsole />
        </div>
    </section>)
}


export default About
