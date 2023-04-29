const newLineChar = "<br />"

type ProcessCommandOptions = {
    linesContainer: HTMLDivElement
    linesShown: number
    lineHeight: number
}

type ProcessCommandReturnType = [number, string[]]

let commands: { [key: string]: (cmdLine: string) => ProcessCommandReturnType } = {
    "clear": () => {
        return [0, [""]]
    },
    "history": () => {
        return [1, ["history"]]
    },
}

let commandList = Object.keys(commands)
commands["help"] = () => {
    return [
        commandList.length + 1,
        [...commandList, "help"]
    ]
}
commands[""] = () => {
    return [
        1,
        [""]
    ]
}

function trimLeft(str: string) {
    return str.trimStart()
}

function firstWord(str: string) {
    return str.replace(/ .*/, '');
}

function processCommand(cmd: string, options: ProcessCommandOptions): ProcessCommandReturnType {

    let shouldAddLine = 1;
    let returnTextList = ["unprocessable command: " + cmd];

    let command = firstWord(trimLeft(cmd))
    console.log(":: command:" + command)
    let proc = commands[command]

    if (!!proc) {
        [shouldAddLine, returnTextList] = proc(cmd)
    } else {
        // do nothing
    }

    return [shouldAddLine, returnTextList]
}


export {
    processCommand
}