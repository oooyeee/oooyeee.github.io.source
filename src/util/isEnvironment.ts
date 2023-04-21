
function isServer(): boolean {
    return !((globalThis.window != undefined) && globalThis.window.document)
}

function isClient(): boolean {
    return !isServer()
}

export {
    isClient,
    isServer
}