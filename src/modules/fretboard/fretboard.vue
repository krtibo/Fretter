<template>
	<div class="fretboard">
		<div class="section">
			<table align="right">
				<tr>
					<th v-for="fretNumbers in 13" :key="fretNumbers">{{ fretNumbers-1 }}</th>
				</tr>
				<tr v-for="(string, index) in frets.strings" :key="index">
					<td v-for="note in string.notes" :key="note">
						<note-dot
							:label="note"
							:which-string="index"
							:is-active="isActive(note)"
							:is-highlighted="isHighlighted(note)"
							@clicked="noteClicked" />
					</td>
				</tr>
			</table>
			<toolbar
				:current-intervals="currentIntervals"
				@interval="changeInterval" />
		</div>
		<div class="random-note-generator section">
			<button
				class="button is-active"
				@click="generateRandomNote">
				Generate random scale
			</button>
			<h1 class="is-size-1">{{ numToNote(randomNote) }} {{ randomMajorMinor }}</h1>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { NoteDot } from 'src/modules/note-dot/main';
import { Fretboard, GuitarString, numToNote } from 'src/domain/fretboard';
import { Toolbar } from 'src/modules/toolbar/main';

export default defineComponent({
	components: {
		NoteDot,
		Toolbar,
	},
	setup() {
		const activeNote = ref(-1);
		const activeString = ref(-1);
		const currentIntervals = ref([1]);
		const randomNote = ref(-1);
		const randomMajorMinor = ref("");
		currentIntervals.value = [];
		const e1String: GuitarString = { notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0] };
		const aString: GuitarString  = { notes: [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5] };
		const dString: GuitarString  = { notes: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
		const gString: GuitarString  = { notes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3] };
		const bString: GuitarString  = { notes: [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7] };
		const e6String: GuitarString = { notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0] };
		const frets: Fretboard = { strings: [e6String, bString, gString, dString, aString, e1String] };

		const noteClicked = ((note: number, aString: number) => {
			if (note === activeNote.value) { 
				activeNote.value = -1; 
			} else {
				activeNote.value = note;
			}
			activeString.value = aString;
		});

		const isActive = ((note: number) => {
			if(note === activeNote.value) return true;
		});

		const isHighlighted = ((note: number) => {
			if (activeNote.value === note || activeNote.value === -1) return false;
			for (var currInt of currentIntervals.value) {
				if ((activeNote.value + currInt) % 12 === note) return true;
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

		const generateRandomNote = () => {
			while (true) {
				let newValue = Math.floor(Math.random() * 11);
				if (newValue !== randomNote.value) {
					randomNote.value = newValue;
					generateMajorMinor();
					return
				}
			}
		}


		const generateMajorMinor = () => {
			randomMajorMinor.value = Math.floor(Math.random() * 10) % 2 === 1 ? "major" : "minor";
		}

		return {
			frets,
			activeNote,
			activeString,
			noteClicked,
			isActive,
			isHighlighted,
			changeInterval,
			currentIntervals,
			generateRandomNote,
			numToNote,
			randomNote,
			randomMajorMinor,
		};
	},
});
</script>
<style>
	.fretboard {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 32px;
		margin-top: 64px;
	}
	.fretboard table {
		border: 1px solid #0F3460;
		width: 100%;
		table-layout: fixed;
		margin-bottom: 32px;
	}
	.fretboard table td {
		border: 1px solid #0F3460;
		height: 32px;
		vertical-align: middle;
	}

	.fretboard table tr th {
		text-align: right;
		color: #0F3460;
		padding-right: 12px;
	}

	.fretboard table tr th:first-child {
		text-align: center;
		padding-right: 0;
	}

	.fretboard table :not(td:first-child) > .note-dot {
		margin: auto 6px auto auto;
	}

	.fretboard table td:first-child > .note-dot {
		margin: auto;
	}

	.fretboard table td:first-child {
		background-color: lightgray;
		color: white;
	}

	.section {
		box-shadow: 0 0 16px #bbbbbb;
		padding: 32px;
		border-radius: 16px;
	}
</style>