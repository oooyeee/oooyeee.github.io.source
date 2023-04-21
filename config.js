// import path from "path"
// import fs from "fs"
// import { fileURLToPath } from "url"

// const __projdir = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

// export default {
//     __projdir
// }

const path = require("path")

module.exports = {
    __projdir: __dirname,
    sass: {
        includePaths: [path.join(__dirname, "src/pages/css").split("\\").join("/") + "/"]
    }
}