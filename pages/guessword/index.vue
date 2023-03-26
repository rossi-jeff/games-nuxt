<template>
	<div class="guess-word-game">
		<!-- guess list -->
		<GuessWordGuessList 
			:guesses="state.guess_word.guesses" 
			v-if="state.guess_word.guesses && state.guess_word.guesses.length" 
		/>
		<!-- guess form -->
		<GuessWordGuessForm 
			:length="state.Length" 
			v-if="state.status == GameStatus.Playing" 
			@send-guess="sendGuess" 
		/>
		<!-- hint list -->
		<GuessWordHintList 
			:hints="state.hints" 
			:show-hints="state.showHints" 
			v-if="state.status == GameStatus.Playing" 
			@toggle-show="toggleHints" 
		/>
		<!-- game options -->
		<GuessWordGameOptions 
			@start-game="reandomWord" 
			v-if="state.status != GameStatus.Playing" 
		/>
		<!-- scores link -->
		<div class="scores-link">
			<NuxtLink to="/guessword/scores">See Top Scores</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { GameStatus } from '~~/utils/enum/game-status.enum';
import { Rating } from '~~/utils/enum/rating.enum';
import { GuessWordGuess } from '~~/utils/types/guess-word-guess.type';
import { GuessWord } from '~~/utils/types/guess-word.type';
import { Word } from '~~/utils/types/word.type';

let status: GameStatus | undefined
let guess_word: GuessWord = {}
let guess_word_guess: GuessWordGuess = {}
let word: Word = {}
type HintArgsType = {
	Length: number;
	Green: string[];
	Gray: string[];
	Brown: string[][];
}
let hintArgs: HintArgsType = {
	Length: 5,
	Green: [],
	Gray: [],
	Brown: []
}
let hints: string[] = []
const state = reactive({ status, Length: 5, guess_word, guess_word_guess, word, hintArgs, showHints: false, hints })

const reandomWord = async (event: any) => {
	const { Length } = event
	state.Length = Length
	state.hintArgs.Length = Length
	try {
		const result = await fetch(`${apiUrl}/api/word/random`, {
			method: 'POST',
			body: JSON.stringify({ Length }),
			headers: buildRequestHeaders(blankSession)
		});
		if (result.ok) {
			state.word = await result.json()
			if (state.word.id) newGame(state.word.id)
		}
	} catch (error) {
		console.log(error)
	}
}

const newGame = async (WordId: number) => {
	try {
		const result = await fetch(`${apiUrl}/api/guess_word`, {
			method: 'POST',
			body: JSON.stringify({ WordId }),
			headers: buildRequestHeaders(blankSession)
		});
		if (result.ok) {
			state.guess_word = await result.json()
			state.status = state.guess_word.Status
		}
	} catch (error) {
		console.log(error);
	}
}

const sendGuess = async (event: any) => {
	const { Guess } = event
	const { guess_word } = state
	const { Word } = state.word
	if (!guess_word.id || !Word) return
	try {
		const result = await fetch(`${apiUrl}/api/guess_word/${guess_word.id}/guess`, {
			method: 'POST',
			body: JSON.stringify({ Guess, Word }),
			headers: buildRequestHeaders(blankSession)
		});
		if (result.ok) {
			state.guess_word_guess = await result.json()
			reloadGame()
		} else {
			console.log(result);
			
		}
	} catch (error) {
		console.log(error);
	}
}

const reloadGame = async () => {
	const { guess_word } = state
	if (!guess_word.id) return
	try {
		const result = await fetch(`${apiUrl}/api/guess_word/${guess_word.id}`);
		if (result.ok) {
			state.guess_word = await result.json()
			buildHintArgs()
			if (state.showHints) getHints()
		}
	} catch (error) {
		console.log(error);
	}

}

const buildHintArgs = () => {
	let { guess_word, hintArgs } = state
	hintArgs.Brown = []
	hintArgs.Green = []
	hintArgs.Gray = []
	for (let i = 0; i < hintArgs.Length; i++) {
		hintArgs.Green[i] = ''
		hintArgs.Brown[i] = []
	}
	if (guess_word.guesses) {
		for (const guess of guess_word.guesses) {
			if (guess.ratings && guess.Guess) {
				for (let i = 0; i < guess.ratings.length; i++) {
					const rating = guess.ratings[i]
					const letter = guess.Guess[i]
					if (rating.Rating == Rating.Green) {
						hintArgs.Green[i] = letter
					} else if (rating.Rating == Rating.Brown) {
						hintArgs.Brown[i].push(letter)
					} else {
						hintArgs.Gray.push(letter)
					}
					hintArgs.Brown[i] = [...new Set(hintArgs.Brown[i])]
				}
			}
		}
		hintArgs.Gray = [...new Set(hintArgs.Gray)]
	}
	state.hintArgs = hintArgs
}

const toggleHints = (event: any) => {
	console.log(event);
	state.showHints = event.show
}

const getHints = async () => {
	const { hintArgs } = state
	try {
		const result = await fetch(`${apiUrl}/api/guess_word/hint`, {
			method: 'POST',
			body: JSON.stringify(hintArgs),
			headers: buildRequestHeaders(blankSession)
		});
		if (result.ok) {
			state.hints = await result.json()
		}
	} catch (error) {
		console.log(error);
	}
}
</script>