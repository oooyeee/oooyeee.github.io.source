import type { ReactNode } from "react"

import { ssr_json_id } from "../constants"

const addGoogleFontPreloaded = () => {
    // lighthouse gives 85/100 if media=print is used with onload,
    // if onload is removed and media=all lighthouse gives 100/100 ???
    const LinkFixed = () => (<script async dangerouslySetInnerHTML={{
        __html: [
            `const preloadLink = document.createElement("link");`,
            `preloadLink.href = "https://fonts.googleapis.com/css?family=Orbitron|Play&display=swap";`,
            `preloadLink.rel = "stylesheet";`,
            `preloadLink.media = "print";`,
            // `preloadLink.fetchPriority = "high";`,
            `preloadLink.setAttribute("onload", "this.media='all'; console.log('should load font')");`,
            `document.head.appendChild(preloadLink);`,
        ].join("\n")
    }}>
    </script>)

    return (<>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Orbitron|Play&display=swap" />
        <LinkFixed />
        <noscript>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Orbitron|Play&display=swap" />
        </noscript>
    </>)
}

type IndexTemplateProps = {
    children: ReactNode
    hydration: any
    jsentry: string
    cssentry: string
}

function IndexTemplate({ children, hydration, jsentry, cssentry }: IndexTemplateProps) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="description" content="Yaroslav Minakov | Personal website" />
                {addGoogleFontPreloaded()}
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#37508c" />
                {process.env["IS_BUILD"] == "true" ? <link rel="stylesheet" href={cssentry}></link> : <script type="module" defer src={cssentry.split(".").reduce((acc, curr, i, arr) => {
                    // this is needed for css hot reloading in vite, sass is included in client script module
                    // on last reduce step, transform extension .css -> .js
                    if (i >= arr.length - 1 ) {
                        return acc += "js";
                    }
                    // on all but last steps 
                    return acc += curr + "."
                }, "")}></script>}
                <title>{hydration.title}</title>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .displaynone {
                        display: none;
                        visibility: hidden;
                    }
                `.split(" ").join("")
                }}></style>
                <script type="application/json" id={`${ssr_json_id}`} dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...hydration }) }}></script>
                {
                    process.env["IS_BUILD"] == "true" ?
                        <>
                            <script crossOrigin="anonymous" defer src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
                            <script crossOrigin="anonymous" defer src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
                        </>
                        :
                        <>
                            <script crossOrigin="anonymous" defer src="https://unpkg.com/react@18/umd/react.development.js"></script>
                            <script crossOrigin="anonymous" defer src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                        </>

                }
                {/* entry */}
                <script type={process.env["IS_BUILD"] == "true" ? null : "module"} defer src={jsentry}></script>
            </head>
            <body id="body">
                {children}
            </body>
        </html>
    )
}



export default IndexTemplate