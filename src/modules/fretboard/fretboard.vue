<template>
	<div class="fretboard">
		<table align="right">
			<tr>
				<th v-for="fretNumbers in 13" :key="fretNumbers">{{ fretNumbers-1 }}</th>
			</tr>
			<tr v-for="(string, index) in frets.strings" :key="string">
				<td v-for="note in string.notes" :key="note">
					<note-dot
						:label="note"
						:which-string="index"
						:is-active="isActive(note, index)"
						:is-highlighted="isHighlighted(note)"
						@clicked="noteClicked" />
				</td>
			</tr>
		</table>
		<toolbar
			:current-intervals="currentIntervals"
			@interval="changeInterval" />
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { NoteDot } from 'src/modules/note-dot/main';
import { Fretboard, GuitarString } from 'src/domain/fretboard';
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
		currentIntervals.value = [];
		const e1String: GuitarString = { notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0] };
		const aString: GuitarString  = { notes: [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5] };
		const dString: GuitarString  = { notes: [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
		const gString: GuitarString  = { notes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3] };
		const bString: GuitarString  = { notes: [7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7] };
		const e6String: GuitarString = { notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0] };
		const frets: Fretboard = { strings: [e6String, bString, gString, dString, aString, e1String] };

		const noteClicked = ((note: number, aString: number) => {
			activeNote.value = note;
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

		return {
			frets,
			activeNote,
			activeString,
			noteClicked,
			isActive,
			isHighlighted,
			changeInterval,
			currentIntervals,
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
</style>