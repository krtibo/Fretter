import type { GuitarString } from './guitar-string';

export type Fretboard = {
	strings: GuitarString[];
}

export function Fretboard(): Fretboard {
	const gstring: GuitarString = {
		notes: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ],
	};
	return {
		strings: [ gstring, gstring, gstring, gstring, gstring, gstring ],
	};
}

export function numToNote(num: number | undefined): string {
	switch(num) {
	case 0: return 'E';
	case 1: return 'F';
	case 2: return 'F#';
	case 3: return 'G';
	case 4: return 'G#';
	case 5: return 'A';
	case 6: return 'A#';
	case 7: return 'B';
	case 8: return 'C';
	case 9: return 'C#';
	case 10: return 'D';
	case 11: return 'D#';
	default: return '';
	}
}