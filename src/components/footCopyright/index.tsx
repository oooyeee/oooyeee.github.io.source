
import style from "./index.sv.gen.json"

const P = () => {
    return (<>
        <p>
            Unauthorized use of my content is a serious offense punishable by a year of paper hands and never-ending cycles of buying highs and selling lows. Don't say I didn't warn you.<b style={{ color: "red", textShadow: "0px 0px 2px black" }}>❤</b>
        </p>
        <p>© 2023 Yaroslav Minakov</p>
    </>)
}


const P2 = () => {
    return (<>
        <p>Never gonna give you up, never gonna let you down, never gonna run around and desert you <b style={{ color: "red", textShadow: "0px 0px 2px black" }}>❤</b></p>
        <p>© 2023 Yaroslav Minakov</p>
    </>)
}

function FootCopyright() {
    return (<section className={style.footCopyright}>
        <P2 />
    </section>)
}


export default FootCopyright