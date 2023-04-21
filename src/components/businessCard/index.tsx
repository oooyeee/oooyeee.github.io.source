
import { useEffect } from "react"
import style from "./index.sv.gen.json"

import SocialButton from "../socialButton"
import delay from "../../util/delay"
import { AnimateText } from "../../util/animateText"

type BusinessCardProps = {
    typingText?: string
}

function BusinessCard({ typingText }: BusinessCardProps) {

    useEffect(() => {
        let typedSpan = document.querySelector(`.${style.businessCard + "__content"} span[data-text]`);

        delay(1500, async () => { await AnimateText(typedSpan as HTMLElement, {addBeam: true})});
    }, [])

    return (<div className={style.businessCard}>
        <div className={style.businessCard + "__imageContainer"}>
            <div className={style.businessCard + "__image"}></div>
        </div>
        <div className={style.businessCard + "__content"}>
            <h1>
                <span>Yaroslav</span>
                <span>Minakov</span>
            </h1>
            <h2>
                <span data-text={typingText ?? "lets get in touch"}>web developer</span>
            </h2>
            <div className={style.businessCard + "__socialLinks"}>
                <SocialButton href="mailto:iam.yaroslav@gmail.com" className={style.socialButton} linkId="link-email" title="send me an email" xlinkHref="/assets/icons.svg#envelope" />
                <SocialButton href="https://www.linkedin.com/in/yaroslavminakov" rel="noopener noreferrer" className={style.socialButton} linkId="link-linkedin" title="my Linkedin" xlinkHref="/assets/icons.svg#linkedin" />
                <SocialButton href="https://github.com/oooyeee" rel="noopener noreferrer" className={style.socialButton} linkId="link-github" title="check my github" xlinkHref="/assets/icons.svg#github" />
                <SocialButton href="https://wa.me/+351914059971/?text=Hello%20Yaroslav!" rel="noopener noreferrer" className={style.socialButton} linkId="link-whatsapp" title="chat with me on WhatsApp" xlinkHref="/assets/icons.svg#whatsApp_bubble" />
            </div>
        </div>
    </div >)
}

export default BusinessCard