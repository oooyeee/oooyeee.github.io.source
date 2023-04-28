import React, { createElement, ReactNode, useRef, useState } from "react"
import { useEffect } from "react";
import { renderToString } from "react-dom/server";
import { AnimateText } from "../../util/animateText";
import { isClient } from "../../util/isEnvironment";

import Chainer from "../../util/chainer";

import { insertBefore, insertAfter } from "../../util/DOMelements";

import style from "./index.sv.gen.json"


import { terminalConsoleContainerId } from "./constants"
import delay from "../../util/delay";

import labelStyle from "../autogrowingTextArea/index.sv.gen.json"
import AutogrowingTextArea from "../autogrowingTextArea";

const text: string[] = [
    `As a person enthusiastic for coding`,
    `committed to continual learning`,
    `with a taste for innovation`,
    `i asked ChatGPT to describe me`, // i = 3

    `He is a talented JavaScript developer, known `,
    `for his ability to write clean and efficient code.`,
    `He possesses a deep understanding of programming `,
    `concepts and has a wealth of`,
    `experience in JavaScript and web development. `,
    `He is able to handle complex projects with`,
    `ease and is able to deliver results under tight deadlines. `,
    `He is passionate about technology`,
    `and continuously seeks to expand his skillset. `,
    `He is a valuable asset to any team due to his`,
    `adaptability and ability to stay current `,
    `with industry trends.`
]


// const text: Array<Array<string | JSX.Element>> = [
//     ["i was born as a baby"],
//     ["learned javascript"],
//     [`and other scary words `, <b style={{ color: "yellow" }}>☻</b>],
//     ["and now i focus on solving puzzles,"],
//     ["assemble code pieces together"],
//     ["and am trying to create value"],
//     ["for other people"],
// ];



function TerminalConsole() {
    useEffect(() => {
        let form: HTMLInputElement = document.querySelector(`#${style.terminalConsoleContainerId}`)
        let input: HTMLInputElement = document.querySelector(`#${style.terminalConsoleContainerId} > label > textarea`)
        let term: HTMLDivElement = document.querySelector(`.${style.terminalConsole}`)

        const enterAndAppendText = (container: HTMLDivElement, input: HTMLInputElement) => {
            let p = document.createElement("p")
            p.innerHTML = input.value
            input.value = ""
            container.appendChild(p)
        }

        form.addEventListener("submit", (ev) => {
            ev.preventDefault()

            enterAndAppendText(term, input)
        })
    }, [])


    return (<form action="" id={style.terminalConsoleContainerId} className="WTF">
        <div className={style.terminalConsole}></div>
        <label className={labelStyle.autogrowingTextAreaParentNode}>
            <AutogrowingTextArea />
        </label>
    </form>)
}


export default TerminalConsole