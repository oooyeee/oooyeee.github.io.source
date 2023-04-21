import path from "path"
import fs from "fs"
import minimist from "minimist"

import { fileURLToPath } from "url"
import { exit } from "process"

const __projectDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../")
const __componentsDir = path.join(__projectDir, "src/components")

function printUsage() {
    console.log(`Usage:
    $: npm run gen -- -[j,m] "component/path" var1 var2 var3 ...
    options:
        --help          print this usage help
        --json          generates json
        --module        generates sass module
        -j              (alias) same as --json
        -m              (alias) same as --module
        -h              (alias) same as --help
    `)
}

if (process.argv.slice(2)[0] === "--") {
    printUsage();
    exit(0)
}

/** @type {import("minimist").Opts} */
let cli_options = {
    default: {
        help: false,
        json: false,
        module: false
    },
    alias: {
        help: ["h"],
        json: ["j"],
        module: ["m"]
    }
}
// ARGS AS BOOLEAN
cli_options.boolean = Object.keys(cli_options.default)

let cli_args = minimist(process.argv.slice(2), cli_options)


let args = {
    help: !!(cli_args["h"]) ?? cli_options.default["help"],
    json: !!(cli_args["j"]) ?? cli_options.default["json"],
    module: !!(cli_args["m"]) ?? cli_options.default["module"]
}

if (args["help"]) {
    printUsage()
    exit(0)
}

try {
    let relPath = path.join(__componentsDir, cli_args["_"][0]);
    let baseName = path.basename(relPath)

    const IsSubfolder = (parentFolder, otherFolder) => {
        let parent = parentFolder.split("\\").join("/").split("/")
        let other = otherFolder.split("\\").join("/").split("/")
        let isSubfolder = true
        for (let i = 0; i < parent.length; i++) {
            if (parent[i] !== other[i]) {
                isSubfolder = false
                break
            }
        }
        return isSubfolder
    }

    if (!IsSubfolder(__componentsDir, relPath)) {
        let error = new Error("Component path must be somewhere inside components folder")
        error["input"] = {
            component__________: cli_args["_"][0].padStart(relPath.length, " "),
            resolvedComponent__: relPath,
            componentsDirectory: __componentsDir
        }
        throw error
    }

    if (args.json) {
        let jsonPath = path.join(relPath, "index.sv.json")
        if (fs.existsSync(jsonPath)) {
            throw new Error("Component json path already exists")
        }

        let vars = cli_args["_"].slice(1)

        let json = []

        if (!vars.includes(baseName)) {
            json.push(baseName)
        }

        // css variable names
        // should start with a letter
        // then be a letter or number, - or _
        // and end with a letter or number
        let regMatch = /^[a-zA-Z][\-\_a-zA-Z0-9]*[a-zA-Z0-9]$/;
        for (let varName of vars) {
            if (!varName.match(regMatch)) {
                continue;
            }
            json.push(varName)
        }

        let jsonString = JSON.stringify(json, null, "\t");

        await fs.promises.writeFile(jsonPath, jsonString, { flag: "w+" })
    }

    if (args.module) {
        let sassModulePath = path.join(relPath, baseName + ".module.sass")
        if (fs.existsSync(sassModulePath)) {
            throw new Error("Component sass module path already exists")
        }

        let sassModule = [
            `// @use "vars.sass" as vars`,
            `@use "./index.sv.gen" as gen`,
            "\n",
            "@mixin main",
            `.#{gen.$${baseName}}`,
            "\n",
        ].join("\n").split("\n\n").join("\n");

        await fs.promises.writeFile(sassModulePath, sassModule, { flag: "w+" })
    }

} catch (err) {
    console.log(err);
}