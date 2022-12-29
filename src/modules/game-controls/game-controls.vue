<template>
	<div class="controls">
        <button 
        class="button"
        @click="generateWithBounds(fromValue, toValue)"
        :disabled="invalidBounds"
        v-shortkey="['enter']" @shortkey="generateWithBounds(fromValue, toValue)">
            Generate note
        </button>
        <div class="fromTo">
            <div class="fromFret mt-4">
                <div class="is-6">From fret No.</div> 
                <select 
                class="button mt-2"
                v-model="fromValue"
                :class="{ 'is-danger is-outlined': invalidBounds }"
                @change="validateBounds">
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
                @change="validateBounds">
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
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { numToNote } from 'src/domain/fretboard';
export default defineComponent({
    props: {
        activeNote: { type: Number, default: -1 },
    },
	emits: ['generated'],
	setup(props, {emit}) {
        const isDropdownActive = ref(false);
        const fromValue = ref(Number(localStorage.fromValue) ? Number(localStorage.fromValue) : 1);
        const toValue = ref(Number(localStorage.toValue) ? Number(localStorage.toValue) : 12);
        const invalidBounds = ref(false);
        const answerLabels = ref([-1]);
        const lastResultBool = ref(false);
        const lastResultText = ref('');
        const lastGuess = ref(-1);
        const generateWithBounds = (from: number, to: number) => {
            emit('generated', from, to);
            lastResultText.value = '';
            lastGuess.value = -1;
        };
        generateWithBounds(fromValue.value, toValue.value);
        const validateBounds = () => {
            if (fromValue.value >= toValue.value) {
                invalidBounds.value = true;
            } else {
                invalidBounds.value = false
            }
            localStorage.fromValue = fromValue.value;
            localStorage.toValue = toValue.value;
        };
        const answerLabelsCo = computed(() => {
            const value = ref([-1]);
            value.value = [];
            value.value.push(props.activeNote);
            for(let i=0; i<2; i++) {
                while(true) {
                    const randomAnswer = Math.floor(Math.random() * 12);
                    if (!value.value.includes(randomAnswer)) {
                        value.value.push(randomAnswer);
                        break;
                    }
                }
            }
            for (let i = value.value.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = value.value[i];
                value.value[i] = value.value[j] as number;
                value.value[j] = temp as number;
            }
            return value.value;
        });
        const validateAnswer = (ans: number | undefined) => {
            lastGuess.value = answerLabelsCo.value.indexOf(ans!)+1;
            if(props.activeNote === ans) {
                lastResultText.value = 'You are correct! 🥹';
                lastResultBool.value = true;
            } else {
                lastResultText.value = 'Wrong answer! 😔';
                lastResultBool.value = false;
            }
        };
		return {
            isDropdownActive,
            generateWithBounds,
            fromValue,
            toValue,
            validateBounds,
            invalidBounds,
            numToNote,
            answerLabels,
            answerLabelsCo,
            validateAnswer,
            lastResultText,
            lastResultBool,
            lastGuess,
		};
	},
});
</script>
<style>
    .fromTo, .answers {
        display: flex;
        gap: 32px;
    }
</style>