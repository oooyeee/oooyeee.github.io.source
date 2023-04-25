import { ssr_json } from "../../constants"
import type { Hydration } from "../../constants"

function getHydration(): Hydration | null {
    let json = null

    try {
        json = JSON.parse(document.querySelector(`#${ssr_json}`).innerHTML)
    } catch (err) { console.log(err) }

    return json
}

export default getHydration