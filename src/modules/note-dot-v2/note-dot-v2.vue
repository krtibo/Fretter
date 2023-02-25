<template>
	<div
		class="note-dot-v2"
		:class="{
			'minor-second': isHighlighted === 1,
			'major-second': isHighlighted === 2,
			'minor-third': isHighlighted === 3,
			'major-third': isHighlighted === 4,
			'perfect-fourth': isHighlighted === 5,
			'perfect-fifth': isHighlighted === 7,
			'minor-sixth': isHighlighted === 8,
			'major-sixth': isHighlighted === 9,
			'minor-seventh': isHighlighted === 10,
			'major-seventh': isHighlighted === 11,
			isInGameMode: isGameMode,
			isActive: isActive
		}"
		@click="isGameMode ? null : $emit('clicked', label, whichString)">
		<span v-if="!isGameMode">{{ numToNote(label) }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { numToNote } from '@/domain/fretboard';

export default defineComponent({
	props: {
		label: { type: Number, required: true },
		whichString: { type: Number, required: true },
		isActive: { type: Boolean, default: false },
		isHighlighted: { type: Number, default: -1 },
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
	}
	/* .isHighlighted {
		background-color: #533483;
		color: white;
	} */
	.isInGameMode {
		height: 27px;
	}
	.minor-second {
		background-color: #f26e53;
		filter: brightness(150%);
		color: white;
	}
	.major-second {
		background-color: #f26e53;
		color: white;
	}
	.minor-third {
		background-color: #6798d0;
		filter: brightness(150%);
		color: black;
	}
	.major-third {
		background-color: #6798d0;
		color: white;
	}
	.perfect-fourth {
		background-color: #ffce55;
		color: black;
	}
	.perfect-fifth {
		background-color: #5bc1a6;
		color: white;
	}
	.minor-sixth {
		background-color: #e788b8;
		filter: brightness(150%);
		color: black;
	}
	.major-sixth {
		background-color: #e788b8;
		color: white;
	}
	.minor-seventh {
		background-color: #207288;
		filter: brightness(150%);
		color: white;
	}
	.major-seventh {
		background-color: #207288;
		color: white;
	}
</style>