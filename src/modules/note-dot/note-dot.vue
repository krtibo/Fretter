<template>
	<div
		class="note-dot"
		:class="{ isActive: isActive, isHighlighted: isHighlighted, isNarrow: isGameMode }"
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
	.note-dot {
		height: 24px;
		width: 48px;
		border-radius: 12px;
		background-color: white;
		font-size: 12px;
		color: #E94560;
		border: 1px solid #E94560;
		display: flex;
		cursor: pointer;
		user-select: none;
	}
	.note-dot span {
		margin: auto;
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
	.isNarrow {
		width: 24px;
	}
</style>