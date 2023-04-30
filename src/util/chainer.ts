type FNType = {
    fn: Function,
    params?: any[]
}

class Chainer {
    #chain: FNType[]
    #abortSignal: AbortSignal
    isRunning: boolean
    constructor(abortSignal: AbortSignal = null) {
        this.#chain = [];
        this.#abortSignal = abortSignal
        this.isRunning = false
    }

    // chain<T extends any[]>(fn: (...params: T) => any, ...params: T) {
    chain<T extends (...args: any) => any>(fn: T, ...params: Parameters<T>) {
        this.#chain.push({
            fn,
            params: params ?? [undefined]
        })
        return this
    }

    async go() {
        this.isRunning = true
        for (let { fn, params } of this.#chain) {
            !this.#abortSignal?.aborted && await fn(...params)
        }
        this.isRunning = false
    }
}

export default Chainer