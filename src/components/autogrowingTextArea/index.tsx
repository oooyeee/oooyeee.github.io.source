
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

    const handleInput: React.FormEventHandler<HTMLTextAreaElement> = (ev) => {
        const target = ev.currentTarget
        target.style.height = 'auto';
        target.style.height = target.scrollHeight + 'px';

        ((textareaRef.current as HTMLElement).parentNode as unknown as {dataset: {replicatedValue: string}}).dataset.replicatedValue = textareaRef.current.value
    }
    return (<textarea className={style.autogrowingTextArea}
        ref={textareaRef}
        name={name}
        placeholder={placeholder}
        onInput={handleInput}
    ></textarea>)
}
export default AutogrowingTextArea