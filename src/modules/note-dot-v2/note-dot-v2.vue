<template>
	<div
		class="note-dot-v2"
		:class="{ isHighlighted: isHighlighted, isInGameMode: isGameMode, isActive: isActive }"
		@click="isGameMode ? null : $emit('clicked', label, whichString)">
		<span v-if="!isGameMode">{{ numToNote(label) }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { numToNote } from 'src/domain/fretboard';

export default defineComponent({
	props: {
		label: { type: Number, required: true },
		whichString: { type: Number, required: true },
		isActive: { type: Boolean, default: false },
		isHighlighted: { type: Boolean, default: false },
		isGameMode: { type: Boolean, default: false },
	},
	emits: ['clicked'],
	setup() {
		return {
			numToNote,
		};
	},
});
</script>
<style>
	.note-dot-v2 {
		font-size: 14px;
		background-color: rgba(230, 230, 230, 0.75);
        padding: 3px 6px;
        border-radius: 6px;
        width: 32px;
        cursor: pointer;
        text-align: center;
	}
	.isActive {
		background-color: #E94560;
		color: white;
		border: none;
	}
	.isHighlighted {
		background-color: #533483;
		color: white;
		border: none;
	}
	.isInGameMode {
		height: 27px;
	}
</style>