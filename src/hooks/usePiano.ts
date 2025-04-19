import { useCallback, useMemo, useState } from 'react';
import Piano from '../audio/piano';
import { NoteDefinition } from '../types/NoteType';

export default function usePiano(): [boolean, (note: NoteDefinition) => void] {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const pianoInstance = useMemo(() => {
    return new Piano({
      minify: true,
      onload: () => setIsLoading(false)
    }).toDestination();
  }, [setIsLoading]);

  const playNote = useCallback((note: NoteDefinition) => {
    if (isLoading) {
      console.warn('Cannot play sound when toneJS is still loading samples');
      return;
    }
    pianoInstance.triggerAttackRelease(note.pitch + note.octave, '1');
  }, [isLoading, pianoInstance]);

  return [isLoading, playNote];
}