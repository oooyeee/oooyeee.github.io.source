import express from "express"

const port = process.env.PORT ?? 9999

let app = express()

const pport = process.env["PORT"] ?? "no PORT"
const dport = process.env["$PORT"] ?? "no $PORT"

app.get("/", (req, res) => {
    let { ip, url, body, method, headers } = req

    console.log([ip, url, body, method, headers])

    res.writeHead(200, [
        "Content-Type", "application/json",
        "Hello", "World :)"
    ])

    let json = "{}"

    try {
        json = JSON.stringify({
            ip,
            method,
            url,
            body,
            headers,
            port: pport,
            dport: dport
        }, null, 4)
    } catch (err) {

    }

    res.end(json)
})

app.listen(port, "0.0.0.0", () => {
    console.log("== railway test app started ==")
})