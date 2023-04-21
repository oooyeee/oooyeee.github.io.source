import getRandomInt from "./getRandomInt"

const abc__num_alpha_ALPHA = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const abc__length = abc__num_alpha_ALPHA.length

const getRandomChar = () => {
    return abc__num_alpha_ALPHA[getRandomInt(0, abc__length)]
}

function genID(length: number) {
    // return new Array(length).fill("0").map(item => getRandomChar()).join("")
    return Array.from({ length }, () => getRandomChar()).join("")
}

export default genID