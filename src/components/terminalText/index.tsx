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

    useEffect(() => {
        let textarea: HTMLTextAreaElement = document.querySelector(`#${style.terminalConsoleContainerId} > div > textarea`)
        let term: HTMLDivElement = document.querySelector(`.${style.terminalConsole}`)

        let span: HTMLSpanElement = document.querySelector(`#${style.terminalConsoleContainerId} > span`)

        let spanPushTimes = 1
        let spanPushHeight: string | number = getRootComputedStylePropertyValue("--consoleTextHeight");
        spanPushHeight = parseInt(spanPushHeight.substring(0, spanPushHeight.length - 2));

        const enterAndAppendText = (container: HTMLDivElement, textarea: HTMLTextAreaElement) => {

            let [newLinesQuantity, resultTextList] = processCommand(textarea.value, {
                linesContainer: term,
                lineHeight: spanPushHeight as number,
                linesShown: 1
            })

            if (!newLinesQuantity) { // should clear console if true
                term.textContent = "";
                textarea.value = ""
                spanPushTimes = 1
                span.style.top = "0px"
            } else {
                let p = document.createElement("p")
                console.log("result text:")
                console.log(resultTextList)
                p.innerHTML = textarea.value
                term.appendChild(p)
                if (resultTextList && resultTextList[0] !== "") { // not empty prompt + not empty response
                    // span.innerHTML = resultTextList.join("<br />")
                    // let spans = []
                    span.style.visibility = "hidden"
                    textarea.style.visibility = "hidden"
                    let chainer = new Chainer()
                    for(let text of resultTextList) {
                        let sp = document.createElement("span")
                        sp.dataset["text"] = text
                        // spans.push(sp)
                        chainer.chain(AnimateText, sp, {
                            onBeforeAnimationStart: ()=>{
                                term.appendChild(sp);
                                span.style.top = (spanPushTimes * (spanPushHeight as number)) + "px";
                                spanPushTimes += 1;
                            },
                            times: 1,
                            pauseBefore: 0,
                            typeDelay: 20,
                            pauseAfter: 0,
                            addBeam: false,
                        })
                    }
                    chainer.chain(()=>{
                        span.style.visibility = "visible"
                        textarea.style.visibility = "visible"
                    })
                    chainer.go()
                    // spanPushTimes += newLinesQuantity
                } else { // for empty prompt + response
                }
                
                textarea.value = ""
                span.style.top = (spanPushTimes * (spanPushHeight as number)) + "px"
                spanPushTimes += 1;
            }

        }

        //============================================ Enter signal
        ee.on("textAreaEnterPressed", () => {
            enterAndAppendText(term, textarea)
        })

    }, [])


    return (<label htmlFor={labelStyle.autogrowingTextArea + "-id"} id={style.terminalConsoleContainerId} className="WTF">
        <div className={style.terminalConsole}></div>
        <span>console:~$</span>
        <div className={labelStyle.autogrowingTextAreaParentNode}>
            <AutogrowingTextArea ee={ee} />
        </div>
    </label>)
}


export default TerminalConsole