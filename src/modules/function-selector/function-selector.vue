<template>
	<div class="buttons has-addons">
		<button
			v-shortkey="['l']"
			class="button"
			:class="{ 'is-selected is-info': !isGameModeProp }"
			@shortkey="toggleMode(false)"
			@click="toggleMode(false)">
			🧠 Learn
		</button>

		<button
			v-shortkey="['p']"
			class="button"
			:class="{ 'is-selected is-info': isGameModeProp }"
			@shortkey="toggleMode(true)"
			@click="toggleMode(true)">
			🕹️ Practice
		</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		isGameModeProp: { type: Boolean, default: false },
	},
	emits: ['selected'],
	setup(_, { emit }) {
		const toggleMode = (isGameModeValue: boolean) => {
			emit('selected', isGameModeValue);
			localStorage.isGameMode = isGameModeValue;
		};
		return {
			toggleMode,
		};
	},
});
</script>
<style>
	.buttons {
		margin: auto;
	}
</style>