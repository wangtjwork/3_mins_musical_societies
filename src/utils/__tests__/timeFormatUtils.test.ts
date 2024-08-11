import { formatSecondsToMinuteAndMaybeHour } from "../timeFormatUtils"

describe('formatSecondsToMinuteAndMaybeHour', () => {
    it('formats seconds correctly', () => {
        expect(formatSecondsToMinuteAndMaybeHour(1)).toStrictEqual({ seconds: 1 });
        expect(formatSecondsToMinuteAndMaybeHour(59)).toStrictEqual({ seconds: 59 });
    });

    it('formats minute correctly', () => {
        expect(formatSecondsToMinuteAndMaybeHour(60)).toStrictEqual({ minutes: 1, seconds: 0 });
        expect(formatSecondsToMinuteAndMaybeHour(61)).toStrictEqual({ minutes: 1, seconds: 1 });
        expect(formatSecondsToMinuteAndMaybeHour(3599)).toStrictEqual({ minutes: 59, seconds: 59 });
    });

    it('formats hours correctly', () => {
        expect(formatSecondsToMinuteAndMaybeHour(3600)).toStrictEqual({ hours: 1, minutes: 0, seconds: 0 });
        expect(formatSecondsToMinuteAndMaybeHour(3660)).toStrictEqual({ hours: 1, minutes: 1, seconds: 0 });
        expect(formatSecondsToMinuteAndMaybeHour(3661)).toStrictEqual({ hours: 1, minutes: 1, seconds: 1 });
        expect(formatSecondsToMinuteAndMaybeHour(86401)).toStrictEqual({ hours: 24, minutes: 0, seconds: 1 });
    });
})