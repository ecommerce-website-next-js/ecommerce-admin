import { useEffect, useState } from "react"

export const useOrigin = () => {
    const [isMounded, setIsMounded] = useState(false);
    const origin = typeof window !== "undefined" && window.location.origin ? window.location.origin : "";

    useEffect(() => {
        setIsMounded(true);
    }, []);

    if (!isMounded) {
        return "";
    }

    return origin;
}