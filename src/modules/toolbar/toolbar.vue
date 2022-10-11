<template>
	<div>
		<div class="toolbar">
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(1)}"
				@click="$emit('interval', 1)">
				Minor 2<sup>nd</sup>
			</button>
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(2)}"
				@click="$emit('interval', 2)">
				Major 2<sup>nd</sup>
			</button>
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(3)}"
				@click="$emit('interval', 3)">
				Minor 3<sup>rd</sup>
			</button>
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(4)}"
				@click="$emit('interval', 4)">
				Major 3<sup>rd</sup>
			</button>
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(5)}"
				@click="$emit('interval', 5)">
				Perfect 4<sup>th</sup>
			</button>
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(7)}"
				@click="$emit('interval', 7)">
				Perfect 5<sup>th</sup>
			</button>
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(8)}"
				@click="$emit('interval', 8)">
				Minor 6<sup>th</sup>
			</button>
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(9)}"
				@click="$emit('interval', 9)">
				Major 6<sup>th</sup>
			</button>
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(10)}"
				@click="$emit('interval', 10)">
				Minor 7<sup>th</sup>
			</button>
			<button
				class="button is-active"
				:class="{ 'is-primary': isCurrent(11)}"
				@click="$emit('interval', 11)">
				Major 7<sup>th</sup>
			</button>
		</div>
		<div class="deselect">
			<button
				class="button is-active is-danger"
				:disabled="currentIntervals.length === 0"
				@click="$emit('interval', -1)">
				Deselect All
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		currentIntervals: { type: Array, default: () => [] },
	},
	emits: ['interval'],
	setup(props) {
		const isCurrent = ((value: number): boolean => {
			if (props.currentIntervals.indexOf(value) > -1)
				return true;
			else return false;
		});
		return {
			isCurrent,
		};
	},
});
</script>
<style>
	.toolbar {
		display: flex;
		gap: 8px;
	}
	.deselect {
		margin-top: 16px;
	}
</style>