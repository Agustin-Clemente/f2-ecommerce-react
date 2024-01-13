import { useState } from "react";

export function useLocalStorage(key, inicial) {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : inicial
        } catch (error) {
            console.log(error)
            return inicial
        }
    })

    const setValue = value => {
        try {
            setStoredValue(value)
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.log(error)
        }
    }

    return [storedValue, setValue]
}