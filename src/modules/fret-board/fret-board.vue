<template>
	<div class="fretboard">
		<function-selector
			:is-game-mode-prop="isGameMode"
			@selected="store.functionChanged" />
		<div class="section board">
			<div class="board-and-notation">
				<div class="fret-board-v2">
					<div class="board-container">
						<div class="strings" v-for="string, i in frets.strings" :key="i">
							<div v-for="note, j in string.notes" :key="j">
								<note-dot-v2
								:label="note"
								:which-string="i"
								:is-active="store.isActive(i,j)"
								:is-highlighted="store.isHighlighted(note)"
								:is-game-mode="isGameMode"
								@clicked="store.noteClicked"
								/>
							</div>
						</div>
					</div>
					<div class="guitar-neck">
						<div class="guitar-cell" v-for="i in 91" :key="i"></div>
					</div>
				</div>
				<div class="fretboard-dots">
					<div class="dot" v-for="i in 4" :key="i"></div>
					<div class="octave">
						<div class="dot" v-for="i in 2" :key="i"></div>
					</div>
				</div>
			</div>
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
import { NoteDotV2 } from 'src/modules/note-dot-v2/main';
import { numToNote } from 'src/domain/fretboard';
import { ToolBar } from 'src/modules/tool-bar/main';
import { TriadGenerator  } from 'src/modules/triad-generator/main';
import { FunctionSelector } from 'src/modules/function-selector/main';
import { GameControls } from 'src/modules/game-controls/main';
import { useFretboardStore } from './fret-board.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
	components: {
		NoteDotV2,
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
		margin-top: 32px;
	}
	.section {
		box-shadow: 0 0 16px #bbbbbb;
		padding: 32px;
		border-radius: 16px;
		width: 100%;
	}
	.fret-board-v2 {
        display: inline-grid;
        grid-template-columns: auto;
    }
    .guitar-neck {
        display: grid;
        grid-template-columns: 64px repeat(12, 50px);
        grid-template-rows: 26px repeat(5, 39px) 26px;
        margin: auto;
    }
    .guitar-cell {
        border: 1px solid rgb(233, 233, 233);
        box-sizing: content-box;
    }
    .board-container, .table-bg, .guitar-neck {
        grid-column: 1;
        grid-row: 1;
    }
    .board-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;
        margin: auto;
        z-index: 1;
    }
    .strings {
        display: grid;
        grid-template-columns: 46px repeat(12, 1fr);
        gap: 18px;
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
	.board {
		display: flex;
		flex-direction: column;
	}
	.board-and-notation {
		margin: auto;
		display: flex;
		flex-direction: column;
		margin-bottom: 32px;
	}
	.dot {
		width: 8px;
		height: 8px;
		background-color: #6610F2;
		border-radius: 4px;
	}
	.fretboard-dots {
		display: grid;
		grid-template-columns: repeat(3, 100px) 142px 100px;
		grid-template-rows: auto;
		align-items: end;
		padding-left: 248px;
		margin-top: 4px;
		margin-left: auto;
		margin-right: auto;
	}
	.octave {
		display: flex;
		gap: 8px;
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
		.board-container {
            flex-direction: row;
            margin-top: 16px;
            margin-left: auto;
        }
		.strings {
            grid-template-columns: 1fr;
            grid-template-rows: 29px repeat(12, 21px);
        }
        .guitar-neck {
            display: grid;
            margin-top: 8px;
            margin-left: 6px;
            grid-template-columns: 22px repeat(5, 44px) 22px;
            grid-template-rows: 57px repeat(12, 39px);
            margin: auto;
        }
		.board-and-notation {
			flex-direction: row-reverse;
		}
		.fretboard-dots {
			grid-template-rows: 147px repeat(3, 78px) 125px;
			grid-template-columns: auto;
			padding-left: 0;
			margin-top: 12px;
			margin-right: 4px;
		}
		.octave {
			flex-direction: column;
		}
	}
	@media screen and (max-width: 400px) {
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