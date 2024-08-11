export function formatSecondsToMinuteAndMaybeHour(seconds: number): {
    minutes?: number,
    seconds: number,
    hours?: number
} {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds - minutes * 60;

    if (minutes == 0) {
        return { seconds };
    }

    if (minutes < 60) {
        return {
            minutes,
            seconds: remainingSeconds
        }
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes - hours * 60;
    return {
        hours,
        minutes: remainingMinutes,
        seconds: remainingSeconds
    }
}