import type { ReactNode } from "react"

import { ssr_json_id } from "../constants"

const addGoogleFontPreloaded = () => {
    // const href = "https://fonts.googleapis.com/css?family=Orbitron|Play&display=swap"
    const href = "https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&family=Montserrat:wght@100;200;400;700&family=Orbitron:wght@400;700&family=Play:wght@400;700&family=Poiret+One&display=swap"

    // const href2 = "https://fonts.cdnfonts.com/css/alegre-sans"

    const LinkFixed = () => (<script async dangerouslySetInnerHTML={{
        __html: [
            `const preloadLink = document.createElement("link");`,
            `preloadLink.href = "${href}";`,
            `preloadLink.rel = "stylesheet";`,
            `preloadLink.media = "print";`,
            // `preloadLink.fetchPriority = "high";`,
            `preloadLink.setAttribute("onload", "this.media='all'");`,
            `document.head.appendChild(preloadLink);`,
        ].join("\n")
    }}>
    </script>)

// const LinkFixed2 = () => (<script async dangerouslySetInnerHTML={{
//     __html: [
//         `const preloadLink = document.createElement("link");`,
//         `preloadLink.href = "${href2}";`,
//         `preloadLink.rel = "stylesheet";`,
//         `preloadLink.media = "print";`,
//         // `preloadLink.fetchPriority = "high";`,
//         `preloadLink.setAttribute("onload", "this.media='all'");`,
//         `document.head.appendChild(preloadLink);`,
//     ].join("\n")
// }}>
// </script>)

    return (<>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="" />
        <link rel="preload" as="style" href={href} />
        {/* <link rel="preload" as="style" href={href2} /> */}
        <LinkFixed />
        {/* <LinkFixed2 /> */}
        <noscript>
            <link rel="stylesheet" href={href} />
            {/* <link rel="stylesheet" href={href2} /> */}
        </noscript>
    </>)
}

type ResumeTemplateProps = {
    children: ReactNode
    hydration: any
    jsentry: string
    cssentry: string
}

function ResumeTemplate({ children, hydration, jsentry, cssentry }: ResumeTemplateProps) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="Author" content="Yaroslav Minakov" />
                <meta name="description" content="Yaroslav Minakov | Resume page" />
                {addGoogleFontPreloaded()}
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#37508c" />
                {process.env["IS_BUILD"] == "true" ? <link rel="stylesheet" href={cssentry}></link> : <script type="module" defer src={cssentry.split(".").reduce((acc, curr, i, arr) => {
                    if (i >= arr.length - 1) {
                        return acc += "js";
                    }
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



export default ResumeTemplate