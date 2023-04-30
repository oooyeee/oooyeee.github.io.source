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
import { aboutText, processCommand } from "./webCliProcessor";

function TerminalConsole() {
    let ee = new EE()

    let pRef = useRef(null)

    let abortRef = useRef(new AbortController())

    let isTextSelecting = useRef(false)

    let textSelection = useRef(null)

    let chainer = useRef(new Chainer(abortRef.current.signal))

    const emitFocus = () => {
        if (chainer.current.isRunning) {
            ee.emit("focusLabel")
        } else {
            ee.emit("focus")
        }
    }

    const handleOnLabelClick: React.MouseEventHandler<HTMLLabelElement> = (ev) => {
        checkSelection()
    }

    const checkSelection = () => {
        let currentText = window.getSelection().toString();
        if (currentText.length > 0) { // dont focus on other things when selecting output text
            console.log(">>> on selection  >> IS SELECTED");
            isTextSelecting.current = true
            textSelection.current = currentText
        } else {
            console.log(">>> on selection  >> IS NOT SELECTED");
            isTextSelecting.current = false;
            emitFocus()
        }
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLLabelElement> = (ev) => {
        if (ev.ctrlKey && ev.key === "c") {
            ev.preventDefault();
            console.log("ctrl + c in LABEL");
            isTextSelecting.current && navigator.clipboard.writeText(textSelection.current)
            !!ee && ee.emit("textAreaInterruptSignal")
        }
    }

    useEffect(() => {
        let label: HTMLTextAreaElement = document.querySelector(`#${style.terminalConsoleContainerId}`)
        let textarea: HTMLParagraphElement = pRef.current
        let term: HTMLDivElement = document.querySelector(`.${style.terminalConsole}`)

        const enterAndAppendText = (text: string[] = undefined, dummyCommand: string = undefined) => {
            let result = text ?? processCommand(textarea.innerText)

            if (result === null) { // clear screen
                term.textContent = ""
                textarea.textContent = "";
                window.scrollTo({
                    behavior: "smooth",
                    top: label.offsetTop
                })
                textarea.focus()
                return;
            }

            if (dummyCommand) {
                result.unshift(dummyCommand)
            } else {
                result.unshift(textarea.innerText)
            }

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
                    typeDelay: 1,
                    pauseAfter: 0,
                    addBeam: false,
                })
            }

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

        //============================================ On first intersection
        const intersectionCb: IntersectionObserverCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // console.log(":: more than 15% is visible LABEL::")
                    enterAndAppendText([aboutText.join(" ")], `cat ./about.txt`)
                    observer.unobserve(label)
                } else {
                    // console.log(":: LESS than 10% is visible  ::")
                }
            })
        }

        const observerOptions: IntersectionObserverInit = {
            root: null,
            threshold: 0.15
        }

        let observer = new IntersectionObserver(intersectionCb, observerOptions)
        observer.observe(label)

        //============================================ On selection change
        // label.addEventListener("selectionchange", onSelectionChange);
        // label.addEventListener("select", onSelectionChange);
        // label.addEventListener("selectstart", onSelectionChange);
    }, [])


    return (<label
        htmlFor={labelStyle.autogrowingTextArea + "-id"}
        onClick={handleOnLabelClick}
        // onSelect={onSelectionChange}
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