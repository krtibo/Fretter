<template>
	<div class="fretboard">
		<function-selector
			:is-game-mode-prop="isGameMode"
			@selected="store.functionChanged" />
		<div class="section board">
			<table align="right">
				<tr>
					<th v-for="fretNumbers in 13" :key="fretNumbers">{{ fretNumbers-1 }}</th>
				</tr>
				<tr v-for="string, i in frets.strings" :key="i">
					<td v-for="note, j in string.notes" :key="j">
						<note-dot
							:label="note"
							:which-string="i"
							:is-active="store.isActive(i,j)"
							:is-highlighted="store.isHighlighted(note)"
							:is-game-mode="isGameMode"
							:class="{'no-background-color': j === 0 && isGameMode}"
							@clicked="store.noteClicked" />
					</td>
				</tr>
			</table>
			<tool-bar
				v-if="!isGameMode"
				:current-intervals="currentIntervals"
				@interval="store.changeInterval" />
			<game-controls
				v-if="isGameMode"
				:active-note="frets.strings[activeString].notes[activeNote]"
				@generated="store.generateNoteAndString" />
		</div>
		<div
			v-if="!isGameMode"
			class="generators mb-5">
			<div class="random-note-generator section">
				<button
					class="button is-active generate-random-scale"
					@click="store.generateRandomScaleAndFret">
					Generate random scale and fret
				</button>
				<div
					v-if="randomNote !== -1"
					class="random-scale mt-5 pt-4">
					<div>
						<div class="is-6">Scale</div>
						<span class="title is-3"> {{ numToNote(randomNote) }} {{ randomMajorMinor }}</span>
					</div>
					<div>
						<div class="is-6">Fret</div>
						<span class="title is-3">No. {{ randomFret }}</span>
					</div>
				</div>
			</div>
			<triad-generator />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NoteDot } from 'src/modules/note-dot/main';
import { numToNote } from 'src/domain/fretboard';
import { ToolBar } from 'src/modules/tool-bar/main';
import { TriadGenerator  } from 'src/modules/triad-generator/main';
import { FunctionSelector } from 'src/modules/function-selector/main';
import { GameControls } from 'src/modules/game-controls/main';
import { useFretboardStore } from './fret-board.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
	components: {
		NoteDot,
		ToolBar,
		TriadGenerator,
		FunctionSelector,
		GameControls,
	},
	setup() {
		const store = useFretboardStore();
		const { activeNote, ...properties } = storeToRefs(store);
		activeNote.value = -1;
		return {
			numToNote,
			activeNote,
			...properties,
			store,
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
		width: 100%;
	}
	.generators {
		display: flex;
		gap: 32px;
		align-items: flex-start;
	}
	.random-scale {
		display: flex;
        gap: 64px;
        border-top: 1px solid hsl(0, 0%, 86%);
	}
	.no-background-color {
		background-color: transparent;
	}
	@media screen and (max-width: 1280px) {
		.generators {
			flex-direction: column;
			align-items: stretch;
		}
		.section {
			width: auto;
			margin-left: 16px;
			margin-right: 16px;
		}
	}
	@media screen and (max-width: 900px) {
		.note-dot {
			width: 32px;
			height: 24px;
			font-size: 10px;
		}
	}
	@media screen and (max-width: 400px) {
		.note-dot {
			width: 12px;
			height: 12px;
			font-size: 10px;
		}
		.random-scale {
			flex-direction: column;
			gap: 16px;
		}
		.fretboard {
			margin-top: 16px;
		}
		.section {
			padding: 16px;
			margin-top: -16px;
			box-shadow: 0 0 8px #bbbbbb;
		}
		.board {
			margin-top: -32px;
		}
		.generate-random-scale {
			width: 100%;
		}
	}
</style>