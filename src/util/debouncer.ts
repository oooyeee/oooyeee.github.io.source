class Debouncer {
    #debounceTimer = null;
    debounce(time: number, fn = () => { }) {
        clearTimeout(this.#debounceTimer);
        this.#debounceTimer = setTimeout(() => { fn() }, time);
    }
}

export default Debouncer