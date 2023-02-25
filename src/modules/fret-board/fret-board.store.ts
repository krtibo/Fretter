import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Fretboard, GuitarString } from '@/domain';

export const useFretboardStore = defineStore('fretboard', () => {
	const isGameMode = localStorage.isGameMode === 'true' ? ref(true) : ref(false);
	const activeNote = ref(0);
	const activeString = ref(0);
	const currentIntervals = ref([1]);
	const randomNote = ref(-1);
	const randomMajorMinor = ref('');
	const randomFret = ref(-1);
	currentIntervals.value = [];
	const e1String: GuitarString = { notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0] };
	const aString: GuitarString  = { notes: [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5] };
	const dString: GuitarString  = { notes: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
	const gString: GuitarString  = { notes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3] };
	const bString: GuitarString  = { notes: [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7] };
	const e6String: GuitarString = { notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0] };
	const frets = ref<Fretboard>({ strings: [e6String, bString, gString, dString, aString, e1String] });

	const functionChanged = (mode: boolean) => {
		isGameMode.value = mode;
		activeNote.value = -1;
		if (mode === true) {
			currentIntervals.value = [];
			generateNoteAndString(0, 12);
		}
	};

	const noteClicked = ((note: number, aString: number) => {
		if (note === activeNote.value) {
			activeNote.value = -1;
		} else {
			activeNote.value = note;
		}
		activeString.value = aString;
	});

	const generateNoteAndString = (from: number, to: number) => {
		activeNote.value = from + Math.floor(Math.random() * (to+1-from));
		activeString.value = Math.floor(Math.random() * 6);
	};

	const isActive = ((string: number, note: number) => {
		if (isGameMode.value && string === activeString.value && note === activeNote.value) {
			return true;
		}
		if (!isGameMode.value && frets.value.strings[string]?.notes[note] === activeNote.value) {
			return true;
		}
		return false;
	});

	const isHighlighted = ((note: number) => {
		if (activeNote.value === note || activeNote.value === -1) return -1;
		for (const currInt of currentIntervals.value) {
			if ((activeNote.value + currInt) % 12 === note) return currInt;
		}
	});

	const changeInterval = ((value: number) => {
		if (value === -1) {
			currentIntervals.value = [];
			return;
		}
		if (currentIntervals.value.indexOf(value) >= 0) {
			currentIntervals.value.splice(currentIntervals.value.indexOf(value), 1);
		} else if (currentIntervals.value.indexOf(value) < 0) {
			currentIntervals.value.push(value);
		}
	});

	const generateRandomScaleAndFret = () => {
		randomNote.value = generateRandomNumberExcluding(randomNote.value, 11);
		randomFret.value = generateRandomNumberExcluding(randomFret.value, 12);
		randomMajorMinor.value = Math.floor(Math.random() * 2) ? 'major' : 'minor';
	};

	const generateRandomNumberExcluding = (numberToExclude: number, upperBound: number): number => {
		for(;;) {
			const randomNumber = Math.floor(Math.random() * upperBound);
			if (randomNumber != numberToExclude) {
				return randomNumber;
			}
		}
	};

	return {
		frets,
		activeNote,
		activeString,
		noteClicked,
		isActive,
		isHighlighted,
		changeInterval,
		currentIntervals,
		generateRandomScaleAndFret,
		randomNote,
		randomMajorMinor,
		randomFret,
		isGameMode,
		functionChanged,
		generateNoteAndString,
	};
});