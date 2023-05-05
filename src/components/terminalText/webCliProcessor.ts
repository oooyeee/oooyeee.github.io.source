const aboutText: string[] = [
    `  Hi there, my name is Yaroslav. I'm glad you are reading this.`,
    `Maybe you are looking for someone skilled in:`,
    `Typescript, C#, SQL, Responsive Design, Automation, DevOps, Networking ? -`,
    `among other things. That is me. Lets get in touch!`
]

type ProcessCommandReturnType = string[] | null

type Commands = {
    [key: string]: (args: string) => ProcessCommandReturnType
}

let files: { [key: string]: string[] } = {
    "about.txt": aboutText,
    "dummy.txt": ["this is a dummy file 1"],
    "dummy2.txt": ["this is a dummy file 2"]
}

function parseCommandOptions(args: string): string[] {
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
        let argsOptions = parseCommandOptions(args)
        let onlyPrintHelp = false

        let thisOptions: commandOptions = {
            "--help": {
                description: [
                    `usage: clear [options]`,
                    `  description: Clears screen`,
                    `  options:`,
                    `  --help:    print this help`,
                ],
                fn: () => {
                    onlyPrintHelp = true
                }
            }
        }

        for (let opt of argsOptions) {
            let hasOpt = thisOptions[opt];
            if (hasOpt) {
                thisOptions[opt].fn()
            }
        }

        if (onlyPrintHelp) {
            return thisOptions["--help"].description
        }

        return null
    },
    "about": (args) => {
        let argsOptions = parseCommandOptions(args)
        let onlyPrintHelp = false

        let thisOptions: commandOptions = {
            "--help": {
                description: [
                    `usage: about [options]`,
                    `  description: Prints about text`,
                    `  options:`,
                    `  --help:    print this help`,
                ],
                fn: () => {
                    onlyPrintHelp = true
                }
            }
        }

        for (let opt of argsOptions) {
            let hasOpt = thisOptions[opt];
            if (hasOpt) {
                thisOptions[opt].fn()
            }
        }

        if (onlyPrintHelp) {
            return thisOptions["--help"].description
        }


        return [aboutText.join(" ")]
    },
    "ls": (args) => {
        let argsOptions = parseCommandOptions(args)
        let onlyPrintHelp = false

        let thisOptions: commandOptions = {
            "--help": {
                description: [
                    `usage: ls [options]`,
                    `  description: Lists folder content`,
                    `  options:`,
                    `  --help:    print this help`,
                ],
                fn: () => {
                    onlyPrintHelp = true
                }
            }
        }

        for (let opt of argsOptions) {
            let hasOpt = thisOptions[opt];
            if (hasOpt) {
                thisOptions[opt].fn()
            }
        }

        if (onlyPrintHelp) {
            return thisOptions["--help"].description
        }


        return Object.keys(files)
    },
    "cat": (args) => {
        let argsOptions = parseCommandOptions(args)
        let addLineNumbers = false
        let onlyPrintHelp = false

        let thisOptions: commandOptions = {
            "--help": {
                description: [
                    `usage: cat [...options] file1 file2 ... fileN`,
                    `  description: Prints file contents`,
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
                for (let fileLine of fileContent) {
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
    return keys.map((key, index) => {
        return "  " + (index + 1).toString().padStart(keys.length, " ") + key.padStart(maxLen, ".");
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