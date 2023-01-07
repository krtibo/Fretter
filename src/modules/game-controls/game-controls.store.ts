import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useGameControlsStore = defineStore('gameControls', () => {
    const activeNote = ref(-1);
    const isDropdownActive = ref(false);
    const fromValue = ref(Number(localStorage.fromValue) ? Number(localStorage.fromValue) : 1);
    const toValue = ref(Number(localStorage.toValue) ? Number(localStorage.toValue) : 12);
    const invalidBounds = ref(false);
    const answerLabels = ref([-1]);
    const lastResultBool = ref(false);
    const lastResultText = ref('');
    const lastGuess = ref(-1);
    const score = ref(0);
    const scoreLock = ref(false);
    const achievablePoints = ref(0);
    const generateWithBounds = () => {
        lastResultText.value = '';
        lastGuess.value = -1;
        scoreLock.value = false;
    };
    const setActiveNote = (note: number) => {
        activeNote.value = note;
    };
    const validateBounds = (): boolean => {
        if (fromValue.value > toValue.value) {
            invalidBounds.value = true;
        } else {
            invalidBounds.value = false
            generateWithBounds();
        }
        localStorage.fromValue = fromValue.value;
        localStorage.toValue = toValue.value;
        return invalidBounds.value;
    };
    const answerLabelsCo = computed(() => {
        const value = ref([-1]);
        value.value = [];
        value.value.push(activeNote.value);
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
        if(activeNote.value === ans) {
            lastResultText.value = 'You are correct! 🥹';
            lastResultBool.value = true;
            if (!scoreLock.value) {
                score.value++;
            }
            scoreLock.value = true;
        } else {
            lastResultText.value = 'Wrong answer! 😔';
            lastResultBool.value = false;
        }
        achievablePoints.value++;
    };
    return {
        isDropdownActive,
        generateWithBounds,
        fromValue,
        toValue,
        validateBounds,
        invalidBounds,
        answerLabels,
        answerLabelsCo,
        validateAnswer,
        lastResultText,
        lastResultBool,
        lastGuess,
        score,
        achievablePoints,
        setActiveNote
    };
  })