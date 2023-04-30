
import { MutableRefObject, useEffect, useRef, useState } from "react";
import EE from "../../util/browserEventEmitter";



import style from "./index.sv.gen.json"
type AutogrowingTextAreaProps = {
    name?: string
    placeholder?: string
    ee?: EE,
    textareaRef: MutableRefObject<any>
}



function AutogrowingTextArea({ name = "", placeholder = "", ee = null, textareaRef }: AutogrowingTextAreaProps) {
    // const textareaRef = useRef(null);
    const caretPosition = useRef(null)

    const handleOnBlur: React.FocusEventHandler<HTMLParagraphElement> = (ev) => {
        caretPosition.current = window.getSelection().getRangeAt(0);
    }

    useEffect(() => {
        let el = textareaRef.current as HTMLParagraphElement
        //============================================ Focus signal
        ee.on("focus", () => {
            if (document.activeElement !== el) {
                el.focus({
                    preventScroll: false
                });

                if (caretPosition.current) {
                    const selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(caretPosition.current);
                }
                // console.log("caret pos: " + (caretPosition.current as Range).endOffset)
            }

        })
    }, []);

    const handleKeyDown: React.KeyboardEventHandler<HTMLParagraphElement> = (ev) => {
        if (ev.key === "Enter") { // Check for "Enter" key
            ev.preventDefault()
            // let el = textareaRef.current as HTMLParagraphElement
            // console.log("on ENTER inner text: " + el.innerText)
            !!ee && ee.emit("textAreaEnterPressed")
        } else if (ev.ctrlKey && ev.key === "c") {
            console.log(" ctrl + c in Paragraph AREA");
            
            !!ee && ee.emit("textAreaInterruptSignal")
        }
    }

    return (<p className={style.autogrowingTextArea}
        id={style.autogrowingTextArea + "-id"}
        tabIndex={-1}
        contentEditable={true}
        ref={textareaRef}
        onKeyDown={handleKeyDown}
        onBlur={handleOnBlur}
    ></p>)
}
export default AutogrowingTextArea