const aboutText: string[] = [
    "  Hi there, my name is Yaroslav. If you are reading this and don't see",
    `a "blue screen of death" - that means i'm certainly have a good`,
    `understanding of programming concepts. I possess broad practical skills in`,
    `Typescript, C#, SQL, Responsive Design, Automation, DevOps, Networking`,
    `and other scary words, but particularly enjoy developing software for the web.`,
    `If you are as enthusiastic about technology as i am, lets get in touch!`,
    "Btw, try other commands, type: help"
]


// const text: Array<Array<string | JSX.Element>> = [
//     ["i was born as a baby"],
//     ["learned javascript"],
//     [`and other scary words `, <b style={{ color: "yellow" }}>☻</b>],
//     ["and now i focus on solving puzzles,"],
//     ["assemble code pieces together"],
//     ["and am trying to create value"],
//     ["for other people"],
// ];

type ProcessCommandReturnType = string[] | null

type Commands = {
    [key: string]: (args: string) => ProcessCommandReturnType
}

let files: { [key: string]: string[] } = {
    "about.txt": aboutText,
    "dummy.txt": ["this is a dummy file 1"],
    "dummy2.txt": ["this is a dummy file 2"]
}

function getCommandOptions(args: string): string[] {
    let argstr = trimLeft(args).trimEnd()
    return argstr.split(" ")
}

type commandOptions = {
    [key: string]: {
        description: string[] | null,
        fn: () => void
    }
}

let commands: Commands = {
    "clear": (args) => {
        return null
    },
    "about": (args) => {
        return [aboutText.join(" ")]
    },
    "ls": (args) => {
        return Object.keys(files)
    },
    "cat": (args) => {
        let argsOptions = getCommandOptions(args)

        let addLineNumbers = false
        let onlyPrintHelp = false

        let thisOptions: commandOptions = {
            "--help": {
                description: [
                    `usage: cat [...options] file1 file2 ... fileN`,
                    `  options:`,
                    `  --help:    print this help`,
                    `  --number:  show line numbers`
                ],
                fn: () => {
                    onlyPrintHelp = true
                }
            },
            "--number": {
                description: null,
                fn: () => {
                    addLineNumbers = true
                }
            }
        }

        let fileNames = [];

        for (let opt of argsOptions) {
            let hasOpt = thisOptions[opt];
            if (hasOpt) {
                thisOptions[opt].fn()
            } else {
                if (opt in files) {
                    fileNames.push(opt)
                } else {
                    return ["unknown file: " + opt]
                }
            }
        }

        if (onlyPrintHelp) {
            return thisOptions["--help"].description
        }

        let outputs: string[] = []

        for (let fileName of fileNames) {
            if (fileNames.length > 1) {
                outputs.push("file: " + fileName)
            }
            let fileContent: string[] = null
            if (addLineNumbers) {
                fileContent = files[fileName].map((line, index) => `${index + 1}: ` + line);
                for(let fileLine of fileContent){
                    outputs.push(fileLine)
                }
            } else {
                fileContent = files[fileName];
                outputs.push(fileContent.join(" "))
            }
        }

        return outputs
    }
}

const helpText = (() => {
    let keys = Object.keys(commands)
    let maxLen = keys.reduce((prev, curr) => {
        return curr.length > prev ? curr.length : prev
    }, 0) + 3
    return keys.map((key) => {
        return "  " + key.padEnd(maxLen, ".")
    })
})();

commands["help"] = (args) => {
    let lines = ["available commands:"]
    lines = [...lines, ...helpText]
    lines.push("to read command manual, type: command --help")
    return lines
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
    processCommand,
    aboutText
}