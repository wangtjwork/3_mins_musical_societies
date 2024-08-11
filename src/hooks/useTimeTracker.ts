import { useRef, useState } from "react";

export default function useTimeTracker(): {
    startClock: () => void,
    getCurrentTimeInSeconds: () => number,
    restartClock: () => void
} {
    const [startTime, setStartTime] = useState<number | null>(null);

    const startClock = () => {
        if (startTime != null) {
            console.warn(`startTime is not null, you have called startClock multiple times`);
            return;
        }

        setStartTime(performance.now());
    }

    const restartClock = () => {
        setStartTime(performance.now());
    }

    const getCurrentTimeInSeconds = () => {
        const startMilliSeconds = startTime;
        if (startMilliSeconds == null) {
            console.error(`startTime is null, you might have forgotten to call startClock`);
            return NaN;
        }

        const currentMilliSeconds = performance.now();
        return Math.floor((currentMilliSeconds - startMilliSeconds) / 1000);
    }
    return { startClock, restartClock, getCurrentTimeInSeconds };
}

