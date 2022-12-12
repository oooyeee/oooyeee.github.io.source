import hydration from "./index.hydration.json" assert { type: 'json' }

function Page() {
    return (
        <html>
            <head>
                {process.env["IS_BUILD"] ? <link rel="stylesheet" href="/css/main.bundle.css"></link> : <script type="module" defer src="/css/main.bundle.js"></script> }
                <title>Home Page</title>
                <script type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ hydration }) }}></script>
                <script crossOrigin="anonymous" defer src="https://unpkg.com/react@18/umd/react.development.js"></script>
                <script crossOrigin="anonymous" defer src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                {/* entry */}
                <script type="module" defer src="/js/main.client.js"></script>
            </head>
            <body id="body">
                <h3>Hello World</h3>
            </body>
        </html>
    )
}



export default Page