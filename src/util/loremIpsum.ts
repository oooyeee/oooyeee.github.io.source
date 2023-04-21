
const original_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const original_text_length = original_text.length

function getText(letters?: number) {
    if (!letters || letters < 0) {
        return original_text
    }

    if (original_text_length >= letters) {
        return original_text.substring(0, letters)
    }

    let length = letters
    let text = ""

    while (original_text_length <= length) {
        text += original_text
        length -= original_text_length
    }

    return text
}

function loremIpsum(letters?: number, times: number = 1) {
    let text = getText(letters)
    if (times === 1) return text;

    let x = Math.floor(times <= 0 ? -1 * times : times)
    return Array(x).fill(text).join(" ")
}


export default loremIpsum