
import style from "./index.sv.gen.json"

type IntersectionProps = {
    title: string,
    marginTop?: string
    marginBottom?: string
}

const svgClass = style.intersection + "__svg"

function Intersection({ title, marginTop, marginBottom }: IntersectionProps = {title: "no title", marginTop: "", marginBottom: ""}) {
    return (<div className={style.intersection} style={{ marginTop: marginTop ?? "", marginBottom: marginBottom ?? "" }}>
        <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 48" style={{ maxHeight: "48px", fill: "none" }}>
            <rect className={svgClass + "__oval"} width="30" height="46" x="1" y="1" ry="15"></rect>
            <path className={svgClass + "__scroller"} d="M16,9 L16,15"></path>
        </svg>
        <span>{title}</span>
    </div>)
}

export default Intersection
