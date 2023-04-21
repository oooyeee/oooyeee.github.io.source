type FNType = {
    fn: Function,
    params?: any[]
}

class Chainer {
    #chain: FNType[]
    constructor() {
        this.#chain = [];
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
        for (let { fn, params } of this.#chain) {
            await fn(...params)
        }
    }
}

export default Chainer