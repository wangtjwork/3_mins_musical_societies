import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';
import { useEffect, useRef } from 'react';

type Props = {
    xmlDoc: XMLDocument
}

function SingleNoteSheet({ xmlDoc }: Props): JSX.Element {
    const sheetRef = useRef(null);

    useEffect(() => {
        const osmd = new OpenSheetMusicDisplay(sheetRef.current as unknown as HTMLElement);
        osmd.setOptions({
            backend: "svg",
            drawTitle: false,
            drawingParameters: "compacttight" // don't display title, composer etc., smaller margins
        });
        osmd.load(xmlDoc).then(() => osmd.render());
    }, [xmlDoc]);

    return (<div className={"sheet"} ref={sheetRef} />);
}

export default SingleNoteSheet