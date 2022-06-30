import { useState, createContext, useEffect } from "react";

export const TasksContexts = createContext();

export const TaskProvider = props => {
    const [tasksProp, setTasksProp] = useLocalState("tasksProp", []);
    function useLocalState(key, initialValue) {
        // State to store our value
        // Pass initial state function to useState so logic is only executed once
        const [storedValue, setStoredValue] = useState(() => {
            if (typeof window !== "undefined") {
                const saved = window.localStorage.getItem(key);
                if (saved !== null) {
                    return JSON.parse(saved);
                }
            }
            return initialValue;
        });

        useEffect(() => {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        }, [storedValue]);

        return [storedValue, setStoredValue];
    }
    return (
        <TasksContexts.Provider value={[tasksProp, setTasksProp]}>
            {props.children}
        </TasksContexts.Provider>
    )
}