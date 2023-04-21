
type EEOptions = {
    maxListeners?: number
    enableDebugErrorMessages?: boolean
}

type AddListenerOptions = {
    once: boolean
}

type ListenerType = (...args: any[]) => void

type Listeners = {
    [eventName: string]: {
        fn: ListenerType
        key?: number | string //@TODO add remove by key
        once: boolean
    }[]
}


/**
 * Browser friendly, simple event emitter
 */
class EE {
    #listeners: Listeners;
    #maxListeners: number;
    #enableDebugErrorMessages: boolean
    constructor(options?: EEOptions) {
        this.#listeners = {}
        this.#maxListeners = options?.maxListeners ? (options?.maxListeners > 0 ? options?.maxListeners : Infinity) : Infinity
        this.#enableDebugErrorMessages = options?.enableDebugErrorMessages ?? false
    }


    addListener(target: string, listener: ListenerType, options?: AddListenerOptions): EE {
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
    removeListener(target: string, listener?: ListenerType): EE {
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

    removeAllListeners(target: string): EE {
        if (this.#listeners[target] !== undefined) {
            delete this.#listeners[target]
        }

        return this
    }

    on = this.addListener
    once(target: string, listener: ListenerType): EE {
        this.addListener(target, listener, { once: true })

        return this
    }
    off = this.removeListener

    emit(target: string, ...params: any): EE {
        if (this.#listeners[target] !== undefined) {
            for (let i = 0; i < this.#listeners[target].length; i++) {
                try {
                    if (this.#listeners[target][i].once) {
                        let ref = this.#listeners[target][i].fn
                        this.#listeners[target].splice(i, 1)
                        i = i - 1; // shift index by 1 to avoid miss, bc array length is 1 item less
                        ref(params)
                    } else {
                        this.#listeners[target][i].fn(params)
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