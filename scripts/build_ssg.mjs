import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { renderToString } from "react-dom/server"
import minimist from "minimist"
import { argv } from "process"

import config from "../config.js"

// IMPORT STATIC PAGES
import home_page from "../dist/pages/index.js"

//==============================================================================================
const __defaultImportFix = (mdl) => {
    return mdl.default ? mdl.default : mdl
}

let command_args = minimist(argv.slice(2), {
    default: {
        build: false
    }
})

process.env.IS_BUILD = command_args["build"] ? "true" : "false"

// const __projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../")
const __projdir = config.__projdir

const ssr = renderToString

class Pages {
    /** @type { {rootPath: string, page: () => JSX.Element}[] } */
    #pages = [];

    add(rootPath, page) {
        this.#pages.push({ rootPath: rootPath, page: __defaultImportFix(page) });
    }

    build(outRootDir) {
        if (this.#pages.length <= 0) {
            return;
        }

        for (let { rootPath, page } of this.#pages) {
            let outPath = path.join(outRootDir, rootPath)
            fs.mkdirSync(path.dirname(outPath), { recursive: true })
            fs.writeFileSync(outPath, "<!DOCTYPE html>" + ssr(page()), { flag: "w+" })
        }
    }
}

// let __viteRootPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../src/ClientApp/root")
let __viteRootPath = path.join(__projdir, "wwwroot/")
let pages = new Pages();
// ==============================================================================================
// =================================================================================SSG BUILD====
// ==============================================================================================
pages.add("index.html", home_page)



// ==============================================================================================
// ==============================================================================================
// ==============================================================================================
pages.build(__viteRootPath)
console.log([":: SSG build DONE ::"])
