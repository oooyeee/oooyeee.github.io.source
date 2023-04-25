// project is "commonjs", but vite docs use "esm" so i decided to use this file as a MODULE

import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from "@vitejs/plugin-react"

import config from "./config.js"

// const __projdir = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const __projdir = config.__projdir
// const __rootdir = path.join(__projdir, "/src/ClientApp/root");
// const __distdir = path.join(__projdir, "/wwwroot")
// const __publicdir = path.join(__projdir, "/src/ClientApp/public")
const __rootdir = path.join(__projdir, "/wwwroot");

/** @type {import('vite').UserConfig} */
export default defineConfig({
    // plugins: [
    //     react({
    //         jsxRuntime: "classic"
    //     }),
    //     splitVendorChunkPlugin()
    // ],
    // css: {
    //     modules: {
    //         scopeBehaviour: "local"
    //     }
    // },
    css: {
        preprocessorOptions: {
            sass: {
                includePaths: config.sass.includePaths
            },
            scss: {
                includePaths: config.sass.includePaths
            }
        }
    },
    root: __rootdir,
    // publicDir: __publicdir,
    // REMOVE BUILD
    // build: {
    //     emptyOutDir: true,
    //     minify: false,
    //     outDir: __distdir,
    //     manifest: true,
    //     rollupOptions: {
    //         input: {
    //             index: path.join(__rootdir, "/index.html"),
    //         },
    //         external: ["react", "react-dom"],
    //         output: {
    //             format: "iife",
    //             globals: {
    //                 "react": "React",
    //                 "react-dom": "ReactDOM"
    //             }
    //         }
    //     }
    // },
    clearScreen: false,
    server: {
        host: "0.0.0.0",
        port: "9999",
        strictPort: "true",
        open: false
    }
})