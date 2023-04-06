<template>
	<div @submit="submitForm" class="credentials-form">
		<div class="input-field">
			<label for="credentials-user-name">User Name</label>
			<input
				type="text"
				name="credentials-user-name"
				v-model="state.credentials.UserName"
			/>
		</div>
		<div class="input-field">
			<label for="credentials-pass-word">Pass Word</label>
			<input
				type="password"
				name="credentials-pass-word"
				v-model="state.credentials.password"
			/>
		</div>
		<div class="submit-button">
			<button @click="submitForm">{{ props.label }}</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ArgsUserCredential } from '../utils/types/args-user-credential.type'

let credentials: ArgsUserCredential = {
	UserName: '',
	password: '',
}
const state = reactive({ credentials })
const props = defineProps(['label'])
const emit = defineEmits(['submitForm'])

const submitForm = (event: any) => {
	event.preventDefault()
	const { credentials } = state
	if (!credentials.UserName || !credentials.password) return
	emit('submitForm', credentials)
	return false
}
</script>

<style lang="postcss">
div.credentials-form {
	@apply flex flex-wrap justify-between p-2 border border-black rounded bg-slate-100;
}
div.input-field label {
	@apply font-bold inline-block mr-2;
}
div.input-field input {
	@apply border border-black rounded h-8;
}
div.submit-button button {
	@apply border border-black rounded px-2 py-1 bg-slate-200;
}
div.submit-button button:hover {
	@apply bg-slate-600 text-white;
}
</style>
