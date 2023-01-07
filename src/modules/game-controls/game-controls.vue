<template>
	<div class="controls">
        <button 
        class="button generate-button"
        @click="generateAndEmit"
        :disabled="invalidBounds"
        v-shortkey="['enter']" @shortkey="generateAndEmit">
            Generate note
        </button>
        <div class="fromTo">
            <div class="fromFret mt-4">
                <div class="is-6">From fret No.</div> 
                <select 
                class="button mt-2"
                v-model="fromValue"
                :class="{ 'is-danger is-outlined': invalidBounds }"
                @change="validateBounds() ? null : generateAndEmit()">
                    <option v-for="i in 12" :key="i" :value="i" :selected="i===1">
                        {{ i }}
                    </option>
                </select>
            </div>
            <div class="toFret mt-4">
                <div class="is-6">To fret No.</div> 
                <select 
                class="button mt-2" 
                v-model="toValue" 
                :class="{ 'is-danger is-outlined': invalidBounds }"
                @change="validateBounds() ? null : generateAndEmit()">
                    <option v-for="j in 12" :key="j" :value="j" :selected="j===12">
                        {{ j }}
                    </option>
                </select>
            </div>
        </div>
        <div class="guesser mt-4">
            <p class="title is-4">Guess the note</p>
            <div class="answers mt-4">
                <button class="button" 
                v-for="i in answerLabelsCo.length"
                :key="i"
                @click="validateAnswer(answerLabelsCo[i-1])"
                :class="{'is-primary': lastGuess === i}"
                v-shortkey="[i]" @shortkey="validateAnswer(answerLabelsCo[i-1])">
                    {{numToNote(answerLabelsCo[i-1])}}
                </button>
                <span 
                v-if="lastResultText !== ''"
                class="tag is-large is-rounded"
                :class="{'is-danger': !lastResultBool, 'is-success': lastResultBool}">{{ lastResultText }}</span>
                <span class="score title is-5">
                    Score: {{ score }} / {{ achievablePoints }} 
                    <span v-if="achievablePoints > 0">
                        ({{ ((score/achievablePoints)*100).toFixed(1) + "%" }})
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { numToNote } from 'src/domain/fretboard';
import { useGameControlsStore } from './game-controls.store';
import { storeToRefs } from 'pinia';

export default defineComponent({
    props: {
        activeNote: { type: Number, default: -1 },
    },
	emits: ['generated'],
    watch: {
        activeNote: function () {
            this.setActiveNote(this.activeNote);
        },
    },
	setup(props, {emit}) {
        const store = useGameControlsStore();
        const { ...properties } = storeToRefs(store);
        const { fromValue, toValue } = storeToRefs(store);
        const { setActiveNote, generateWithBounds, validateBounds, validateAnswer } = store;
        const generateAndEmit = () => {
            emit('generated', fromValue.value, toValue.value);
            generateWithBounds();
        };
        generateAndEmit();
        return {
            numToNote,
            generateAndEmit,
            validateBounds,
            validateAnswer,
            setActiveNote,
            ...properties,
        };
	},
});
</script>
<style>
    .fromTo, .answers {
        display: flex;
        gap: 32px;
    }
    span:last-of-type {
        margin-left: auto;
    }
    @media screen and (max-width: 400px) {
        .fromTo {
            justify-content: space-between;
            width: 100%;
        }
        .generate-button {
            width: 100%;
            margin-top: -16px;
        }
		.answers {
            flex-direction: column;
            justify-items: center;
            gap: 16px;
		}
        span:last-of-type {
            margin: auto;
        }
	}
</style>