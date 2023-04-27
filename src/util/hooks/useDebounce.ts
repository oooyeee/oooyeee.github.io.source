import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react"

function useDebouncedFromState<T>(changingStateValue: T, ms: number) {
    const [debouncedValue, setDebouncedValue] = useState(changingStateValue);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(changingStateValue);
        }, ms);

        return () => {
            clearTimeout(timer);
        };
    }, [changingStateValue]);
    return debouncedValue;
}

/**
 * Imitates useEffect, but setter is debounced by specidied time in ms.
 * Uses useState twice and useEffect
 */
function useDebounceState<T>(initialValue: T, ms: number): [T, Dispatch<SetStateAction<T>>] {
    const [debouncingValue, setDebouncedValue] = useState(initialValue)
    const debouncedValue = useDebouncedFromState(debouncingValue, ms)
    return [debouncedValue, setDebouncedValue]
}
/**
 * Imitates useEffect, but setter is debounced by specidied time in ms.
 * Uses useState twice and useEffect
 */
function useDebounceState2<T>(initialValue: T, ms: number): [T, Dispatch<SetStateAction<T>>] {
    const [debouncingValue, setDebouncedValue] = useState(initialValue)
    const [debouncedValue, _setDebouncedValue] = useState(debouncingValue);
    useEffect(() => {
        const timer = setTimeout(() => {
            _setDebouncedValue(debouncingValue);
        }, ms);

        return () => {
            clearTimeout(timer);
        };
    }, [debouncingValue]);
    return [debouncedValue, setDebouncedValue]
}


export {
    useDebouncedFromState,
    useDebounceState,
    useDebounceState2 as useDebounce
}