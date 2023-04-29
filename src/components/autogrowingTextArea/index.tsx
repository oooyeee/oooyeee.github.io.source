
import { useEffect, useRef, useState } from "react";
import EE from "../../util/browserEventEmitter";



import style from "./index.sv.gen.json"
type AutogrowingTextAreaProps = {
    name?: string
    placeholder?: string
    ee?: EE
}
function AutogrowingTextArea({ name = "", placeholder = "", ee = null }: AutogrowingTextAreaProps) {
    const textareaRef = useRef(null);

    const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (ev) => {
        if (ev.key === "Enter") { // Check for "Enter" key
            ev.preventDefault()
            !!ee && ee.emit("textAreaEnterPressed")
        }
    }

    const handleInput: React.FormEventHandler<HTMLTextAreaElement> = (ev) => {
        const target = ev.currentTarget
        const value = textareaRef.current.value.trimEnd()
        target.style.height = target.scrollHeight + 'px';        
        ;((textareaRef.current as HTMLElement).parentNode as unknown as { dataset: { replicatedValue: string } }).dataset.replicatedValue = value
    }
    return (<textarea className={style.autogrowingTextArea}
        id={style.autogrowingTextArea + "-id"}
        rows={1}
        ref={textareaRef}
        name={name}
        placeholder={placeholder}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
    ></textarea>)
}
export default AutogrowingTextArea