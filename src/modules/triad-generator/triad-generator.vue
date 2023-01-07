<template>
	<div class="random-triad-generator section">
		<div class="control">
			<button
				class="button is-active generate-triad"
				@click="generateTriad">
				Generate random triad
			</button>
			<label class="ml-4 checkbox">
				<input v-model="degreeCheckbox" type="checkbox">
				Degree
			</label>
			<label class="ml-4 checkbox">
				<input v-model="inversionCheckbox" type="checkbox">
				Inversion
			</label>
		</div>
		<div v-if="generatedValues[0] !== -1" class="generated mt-5 pt-4">
			<div class="scale">
				<div class="is-6">Scale</div>
				<span class="title is-3"> {{ scales[generatedValues[0]] }} major</span>
			</div>
			<div v-if="degreeCheckbox" class="degree">
				<div class="is-6">Degree</div>
				<span class="title is-3">{{ degrees[generatedValues[1]] }}</span>
			</div>
			<div v-if="inversionCheckbox" class="inversion">
				<div class="is-6">Inversion</div>
				<span class="title is-3">{{ inversions[generatedValues[2]] }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTriadGeneratorStore } from './triad-generator.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
	setup() {
		const store = useTriadGeneratorStore();
		const { generateTriad } = store;
		const { ...rest } = storeToRefs(store);
		return { generateTriad, ...rest };
	},
});
</script>
<style>
	.generated {
		display: flex;
		gap: 64px;
		border-top: 1px solid hsl(0, 0%, 86%);
	}
	.control {
		display: flex;
		align-items: center;
	}
	@media screen and (max-width: 400px) {
		.control, .generated {
			flex-direction: column;
			gap: 12px;
		}
		.generated {
			flex-direction: column;
			gap: 16px;
		}
		.generate-triad {
			width: 100%;
		}
	}
</style>