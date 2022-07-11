import express from "express"

let app = express()

app.get("/", (req, res) => {
    let { ip, url, body, method, headers } = req

    console.log([ip, url, body, method, headers])

    res.writeHead(200, [
        "Content-Type", "application/json",
        "Hello", "World"
    ])

    let json = "{}"

    try {
        json = JSON.stringify({
            ip,
            method,
            url,
            body,
            headers
        })
    } catch (err) {

    }

    res.end(json)
})

app.listen(9999, () => {
    console.log("== railway test app started ==")
})