import { useState, useEffect } from "react"


function Dummy({ msg }: { msg: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("::::::::::::::::::::::::: DUMMY LOADED :::::::::::::::::::::::::")
    }, [])

    const onClickHandler = () => {
        setCount(count + 1)
        console.log("clicked: " + count + " times");
    }

    return (<button onClick={onClickHandler} style={{ display: "block", width: "100%", height: "100px", border: "2px solid cyan", textAlign: "center", cursor: "pointer" }}>{msg}</button>)
}

export default Dummy