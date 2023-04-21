
import style from "./index.sv.gen.json"

export type SocialButtonProps = {
    href: string
    className?: string
    rel?: string
    linkId?: string
    xlinkHref: string
    title?: string
    text?: string
}

const Title = (title: string) => <title>{title}</title>
const Text = (text: string) => <span>{text}</span>

function SocialButton({ href, className, rel, linkId, xlinkHref, title, text }: SocialButtonProps) {
    return (<>
        <a href={href} target="_blank" rel={rel ?? ""} className={className ?? style.socialButton} id={linkId ?? ""}>
            <svg>
                {title ? Title(title) : ""}
                <use xlinkHref={xlinkHref}></use>
            </svg>
            {text ? Text(text) : ""}
        </a>
    </>)
}

export default SocialButton