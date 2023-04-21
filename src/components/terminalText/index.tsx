import React, { ReactNode, useState } from "react"
import { useEffect } from "react";
import { renderToString } from "react-dom/server";
import { AnimateText } from "../../util/animateText";
import { isClient } from "../../util/isEnvironment";

import Chainer from "../../util/chainer";

import { insertBefore, insertAfter } from "../../util/DOMelements";

import style from "./index.sv.gen.json"
import { terminalConsoleContainerId } from "./constants"
import delay from "../../util/delay";

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
        let parentContainer = document.querySelector("#" + terminalConsoleContainerId)

        let chainer = new Chainer()

        let b = document.createElement("b")
        b.innerText = " ☻:"
        b.style.color = "yellow"


        for (let i = 0; i < text.length; i++) {
            chainer.chain(async () => {
                let pp = document.createElement("p")
                pp.dataset["text"] = text[i]
                pp.className = (i > 3) ? style.aibot : style.myname
                parentContainer.appendChild(pp)
                await AnimateText(pp, {
                    times: 1, pauseAfter: 70, addBeam: true, keepBeamAfterAnimation: (i === text.length - 1 ? true : false), beamAsPseudo: true, typeDelay: 70,
                    onBeforeAnimationEnd: (i === 3) ? (element) => {
                        element.appendChild(b)
                    } : undefined
                })
            })
        }

        delay(100, async () => {
            await chainer.go()
        })
    }, [])


    let keyCounter = 0;
    return (<div className={style.terminalConsole}>
        <noscript>
            {text.map(line => <span key={keyCounter++} dangerouslySetInnerHTML={{ __html: line }}></span>)}
            {keyCounter = 0}
        </noscript>
    </div>)
}


export default TerminalConsole