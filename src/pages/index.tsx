import hydration from "./index.hydration.json"
import Header from "../components/header"

function Page() {
    return (
        <html>
            <head>
                {process.env["IS_BUILD"] == "true" ? <link rel="stylesheet" href="/css/main.bundle.css"></link> : <script type="module" defer src="/css/main.bundle.js"></script>}
                <title>Home Page</title>
                <script type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ hydration }) }}></script>
                <script crossOrigin="anonymous" defer src="https://unpkg.com/react@18/umd/react.development.js"></script>
                <script crossOrigin="anonymous" defer src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                {/* entry */}
                <script type="module" defer src="/js/main.client.js"></script>
            </head>
            <body id="body">
                <header id="header-isle">
                    <Header />
                </header>
                <h1>Hello World</h1>
                <main>
                    <section>
                        <h2>Section 1</h2>
                        <div className="wrapper section1" id="section-1-isle"></div>
                    </section>
                    <section>
                        <h2>Section 2</h2>
                        <div className="wrapper section2" id="section-2-isle"></div>
                    </section>
                </main>
                <footer id="footer-isle"></footer>
            </body>
        </html>
    )
}



export default Page