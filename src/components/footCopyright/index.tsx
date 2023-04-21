
import style from "./index.sv.gen.json"


function FootCopyright() {
    return (<section className={style.footCopyright}>
        <p>Never gonna give you up, never gonna let you down, never gonna run around and desert you <b style={{ color: "red", textShadow: "0px 0px 2px black" }}>❤</b></p>
        <p>© 2022 Yaroslav Minakov</p>
    </section>)
}


export default FootCopyright