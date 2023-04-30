import React, { createElement, ReactNode, useRef, useState } from "react"
import { useEffect } from "react";
import { renderToString } from "react-dom/server";
import { AnimateText } from "../../util/animateText";
import { isClient } from "../../util/isEnvironment";

import Chainer from "../../util/chainer";

import { insertBefore, insertAfter, getRootComputedStylePropertyValue } from "../../util/DOMelements";

import style from "./index.sv.gen.json"


import { terminalConsoleContainerId } from "./constants"
import delay from "../../util/delay";

import labelStyle from "../autogrowingTextArea/index.sv.gen.json"
import AutogrowingTextArea from "../autogrowingTextArea";
import EE from "../../util/browserEventEmitter";
import { processCommand } from "./webCliProcessor";

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
    let ee = new EE()

    let pRef = useRef(null)

    let abortRef = useRef(new AbortController())

    let chainer = useRef(new Chainer(abortRef.current.signal))

    const handleOnLabelClick: React.MouseEventHandler<HTMLLabelElement> = (ev) => {
        if (chainer.current.isRunning) {
            ee.emit("focusLabel")
        } else {
            ee.emit("focus")
        }
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLLabelElement> = (ev) => {
        if (ev.ctrlKey && ev.key === "c") {
            ev.preventDefault();
            console.log("ctrl + c in LABEL");
            !!ee && ee.emit("textAreaInterruptSignal")
        }
    }

    useEffect(() => {
        let label: HTMLTextAreaElement = document.querySelector(`#${style.terminalConsoleContainerId}`)
        let textarea: HTMLParagraphElement = pRef.current
        let term: HTMLDivElement = document.querySelector(`.${style.terminalConsole}`)

        const enterAndAppendText = () => {
            let result = processCommand(textarea.innerText)

            if (result === null) {
                term.textContent = ""
                textarea.textContent = "";
                return;
            }

            result.unshift(textarea.innerText)
            let lines = result.length

            textarea.textContent = "";

            chainer.current = new Chainer(abortRef.current.signal)

            chainer.current.chain(() => {
                textarea.style.visibility = "hidden"
            });

            for (let i = 0; i < lines; i++) {
                let line = result[i];
                let p = document.createElement("p")
                if (i > 0) {
                    p.classList.add(style.terminalConsole + "_multiline")
                } else {
                    chainer.current.chain(async () => {
                        p.innerText = line
                        term.appendChild(p)
                    })
                    continue;
                }
                p.dataset["text"] = line
                chainer.current.chain(AnimateText, p, {
                    onBeforeAnimationStart: () => {
                        term.appendChild(p)
                    },
                    abortSignal: (abortRef.current as AbortController).signal,
                    times: 1,
                    pauseBefore: 0,
                    typeDelay: 20,
                    pauseAfter: 0,
                    addBeam: false,
                })
            }

            // chainer.current.chain(() => {
            //     textarea.style.visibility = "visible"
            //     textarea.focus()
            // })
            chainer.current.go().then(() => {
                abortRef.current = new AbortController()
                chainer.current = new Chainer(abortRef.current.signal)
                
                textarea.style.visibility = "visible"
                textarea.focus()
            });
        }

        //============================================ Enter signal
        ee.on("textAreaEnterPressed", () => {
            console.log(" trigger ")
            label.focus()
            try {
                enterAndAppendText()
            } catch (err) {
                console.log(err)
            }
        });

        //============================================ Interrupt signal
        ee.on("textAreaInterruptSignal", () => {
            console.log(":: caught ctrl + c ::");
            if (chainer.current.isRunning) {
                (abortRef.current as AbortController).abort();
                console.log("hos iw abort signal: " + abortRef.current.signal.aborted)
            }
        })

        //============================================ On Focus Label when chainer is running
        ee.on("focusLabel", () => {
            console.log("while chainer is runnig, i focus label")
            label.focus()
        })

    }, [])


    return (<label
        htmlFor={labelStyle.autogrowingTextArea + "-id"}
        onClick={handleOnLabelClick}
        tabIndex={-1}
        // contentEditable={true}
        onKeyDown={handleKeyDown}
        id={style.terminalConsoleContainerId}
        className="WTF">
        <div className={style.terminalConsole}></div>
        <div className={labelStyle.autogrowingTextAreaParentNode}>
            <AutogrowingTextArea ee={ee} textareaRef={pRef} />
        </div>
    </label>)
}


export default TerminalConsole