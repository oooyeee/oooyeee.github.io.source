import { createElement } from "react"
import style from "./index.sv.gen.json"

type ContactsProperties = {
    id?: string
}

function Contacts({ id }: ContactsProperties) {

    let react_duct_taped_textArea = [
        "<span>Message:</span>",
        `<textarea name="message" placeholder="What's up!" oninput="this.parentNode.dataset.replicatedValue = this.value"></textarea>`
    ].join("");

    return (<section id={id ?? "contacts"} className={style.contacts}>
        <div className={style.contacts + "__wrapper"}>
            <div className={style.contactLinks}>
                <h3>contact info</h3>
                <ul>
                    <li>
                        <a href="mailto:iam.yaroslav@gmail.com" target="_blank" rel="noopener noreferrer">
                            <svg>
                                <title>send me an email</title>
                                <use xlinkHref="/assets/icons.svg#envelope"></use>
                            </svg>
                            <span>iam.yaroslav@gmail.com</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/yaroslavminakov" target="_blank" rel="noopener noreferrer">
                            <svg>
                                <title>my Linkedin</title>
                                <use xlinkHref="/assets/icons.svg#linkedin"></use>
                            </svg>
                            <span>linkedin</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://wa.me/+351914059971/?text=Hello%20Yaroslav!" target="_blank" rel="noopener noreferrer">
                            <svg>
                                <title>chat with me on WhatsApp</title>
                                <use xlinkHref="/assets/icons.svg#whatsApp_bubble"></use>
                            </svg>
                            <span>whatsapp</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/optimusfine" target="_blank" rel="noopener noreferrer">
                            <svg>
                                <title>PM me on telegram</title>
                                <use xlinkHref="/assets/icons.svg#telegram"></use>
                            </svg>
                            <span>telegram</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/oooyeee" target="_blank" rel="noopener noreferrer">
                            <svg>
                                <title>check my github</title>
                                <use xlinkHref="/assets/icons.svg#github"></use>
                            </svg>
                            <span>github</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={style.messageForm}>
                <h3>Hi, lets talk!</h3>
                <form action="https://api.yaro.pt/yaro.pt/messageform" className={style.messageForm + "__form"}>
                    <label className={style.messageForm + "__label-name"}>
                        <span>Name:</span>
                        <input type="text" name="name" placeholder="Your name"/>
                    </label>
                    <label className={style.messageForm + "__label-email"}>
                        <span>Email:</span>
                        <input type="text" name="email" placeholder="you@example.com"/>
                    </label>
                    <label className={style.messageForm + "__label-message"} dangerouslySetInnerHTML={{__html: react_duct_taped_textArea}}></label>
                    <input type="submit" className={style.messageForm + "__submit"} />
                </form>
            </div>
        </div>
    </section>)
}

export default Contacts