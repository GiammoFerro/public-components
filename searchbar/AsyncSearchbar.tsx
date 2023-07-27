import { useCallback, useEffect, useState } from "react";

const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
    let timerId: ReturnType<typeof setTimeout>;
    return (...args: T) => {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};


const AsyncSearchbar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const debouncedSearch = useCallback(
        debounce(async (value: string) => {
            // do something with value
            console.log(value);
            }, 300
        ), []);

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);


    return (
        <div className={"gap-4 w"}>
            {/*<TextField*/}
            {/*    onChange={(e) => setSearchTerm(e.target.value)}*/}
            {/*/>*/}
        </div>
    );
};

export default AsyncSearchbar;