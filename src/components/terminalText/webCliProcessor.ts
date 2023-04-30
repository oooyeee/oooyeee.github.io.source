const newLineChar = "<br />"


type ProcessCommandReturnType = string[] | null

type Commands = {
    [key: string]: (args: string) => ProcessCommandReturnType
}

let commands: Commands = {
    "clear": (args) => {
        return null
    },
    "hello": (args) => {
        return ["world"]
    },
    "hello2": (args) => {
        return ["hello", "world", "kek"]
    }
}

const helpText = (()=>{
    let keys = Object.keys(commands)
    return keys
})();

commands["help"] = (args) => {
    return helpText
}

commands[""] = (args) => {
    return [""]
}


function trimLeft(str: string) {
    return str.trimStart()
}

function firstWord(str: string) {
    return str.replace(/ .*/, '');
}

function processCommand(commandString: string): ProcessCommandReturnType {

    let commandStripped = trimLeft(commandString);
    let cmd = firstWord(commandStripped);
    let args = commandStripped.replace(/^(\S+)\s*/, "");

    let result = commands[cmd]

    if (!result) {
        return ["unprocessable command: " + commandString]
    }

    console.log(" internal result")
    console.log(result(args));
    
    return result(args)
}


export {
    processCommand
}