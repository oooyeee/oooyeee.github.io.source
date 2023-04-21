function delay(ms: number): Promise<void>;
function delay<T>(ms: number, fn: () => T): Promise<T>;
function delay(ms: number, fn = () => {}): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(fn()) }, ms)
    })
}

// function delay(ms: number, fn = () => { }) {
//     return new Promise((resolve) => {
//         setTimeout(() => { resolve(fn()) }, ms)
//     })
// }

export default delay