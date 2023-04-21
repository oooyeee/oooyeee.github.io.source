class Throttler {
    #throttlePause = false;
    #maxQty: number

    constructor(quantity: number = Infinity) {
        this.#maxQty = quantity
    }

    throttle(time: number, fn = () => { }) {
        if (this.#throttlePause) return;
        this.#throttlePause = true;
        setTimeout(() => {
            fn();
            this.#throttlePause = false;
        }, time);
    }

    throttleByQty(currentQuantity: number, fn = () => { }) {
        if (currentQuantity > this.#maxQty) {
            return;
        } else {
            fn();
        }
    }

    throttleByQtyAndTime(time: number, currentQuantity: number, fn = () => { }) {
        if (this.#throttlePause || currentQuantity > this.#maxQty) return;
        this.#throttlePause = true;
        setTimeout(() => {
            fn();
            this.#throttlePause = false;
        }, time);
    }
}


export default Throttler