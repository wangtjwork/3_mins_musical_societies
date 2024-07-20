import { useCallback, useMemo, useState } from "react";

type QuestionSeriesRet = {
    index: number,
    hasNext: boolean,
    goToNext: () => void,
    hasPrevious: boolean,
    goToPrevious: () => void
};

function useQuestionSeries(seriesLength: number): QuestionSeriesRet {
    const [index, setIndex] = useState(1);

    const goToNext = useCallback(() => setIndex((i) => i + 1), [setIndex]);
    const hasNext = useMemo(() => index < seriesLength, [index, seriesLength]);

    const goToPrevious = useCallback(() => setIndex((i) => i + 1), [setIndex]);
    const hasPrevious = useMemo(() => index > 0, [index, seriesLength]);

    return {
        index, hasNext, goToNext, hasPrevious, goToPrevious
    };
}

export default useQuestionSeries;