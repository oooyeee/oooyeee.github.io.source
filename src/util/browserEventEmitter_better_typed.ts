
type EEOptions = {
    maxListeners?: number
    enableDebugErrorMessages?: boolean
}

type AddListenerOptions = {
    once: boolean
}

type ListenerType<A extends any[]> = (...args: A) => void

type EventMap = Record<string, ListenerType<any[]>>;

type Listeners<EM extends EventMap> = {
    [eventName in keyof EM]: {
        fn: ListenerType<Parameters<EM[eventName]>>
        key?: number | string
        once: boolean
    }[]
}

/**
 * Browser friendly, simple event emitter
 */
class EE<EM extends EventMap> {
    #listeners: Listeners<EM>;
    #maxListeners: number;
    #enableDebugErrorMessages: boolean
    constructor(options?: EEOptions) {
        this.#listeners = {} as Listeners<EM>;
        this.#maxListeners = options?.maxListeners ? (options?.maxListeners > 0 ? options?.maxListeners : Infinity) : Infinity
        this.#enableDebugErrorMessages = options?.enableDebugErrorMessages ?? false
    }


    addListener<E extends keyof EM>(target: E, listener: EM[E], options?: AddListenerOptions): EE<EM> {
        if (this.#listeners[target] !== undefined && this.#listeners[target].length < this.#maxListeners) {
            this.#listeners[target].push({
                fn: listener,
                once: options?.once ? options?.once : false
            })
        } else {
            this.#listeners[target] = [{
                fn: listener,
                once: options?.once ? options?.once : false
            }]
        }

        return this
    }

    /**
     * * Removes the last listener from a certain event if a listener is not provided,  
     * if a listener is provided, checks if a listener (function) exists with that name  
     * and removes the first one with that name (function name)  
     * * If a listener is anonymous (???) removes nothing  
     * * If a listener not found removes nothing  
     */
    removeListener<E extends keyof EM>(target: E, listener?: ListenerType<any[]>): EE<EM> {
        if (this.#listeners[target] !== undefined) {
            if (listener === undefined) {
                this.#listeners[target].pop()
            } else {
                // change to findLastIndex to remove the last listener with its name
                let indexToBeRemoved = this.#listeners[target].findIndex((item) => item.fn.name === listener.name)
                if (-1 !== indexToBeRemoved) {
                    this.#listeners[target].splice(indexToBeRemoved, 1)
                }
            }
        }

        return this
    }

    removeAllListeners<E extends keyof EM>(target: E): EE<EM> {
        if (this.#listeners[target] !== undefined) {
            delete this.#listeners[target]
        }

        return this
    }

    on = this.addListener
    once<E extends keyof EM>(target: E, listener: EM[E]): EE<EM> {
        this.addListener(target, listener, { once: true })

        return this
    }
    off = this.removeListener

    emit<E extends keyof EM>(target: E, ...params: Parameters<EM[E]>): EE<EM> {
        if (this.#listeners[target] !== undefined) {
            for (let i = 0; i < this.#listeners[target].length; i++) {
                try {
                    if (this.#listeners[target][i].once) {
                        let ref = this.#listeners[target][i].fn
                        this.#listeners[target].splice(i, 1)
                        i = i - 1; // shift index by 1 to avoid miss, bc array length is 1 item less
                        ref(...params)
                    } else {
                        this.#listeners[target][i].fn(...params)
                    }
                } catch (err) {
                    if (this.#enableDebugErrorMessages) {
                        console.error(err);
                    }
                }
            }
        }
        return this
    }
}

export default EE

export type {
    EE
}