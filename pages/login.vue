<template>
	<div class="login-container">
		<div v-if="!session.SignedIn">
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
				<button @click="login">Sign In</button>
			</div>
		</div>
		<div class="logout-form" v-else>
			<button @click="clearSession">Sign Out</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { SessionData } from '../utils/session.store'
import { ArgsUserCredential } from '../utils/types/args-user-credential.type'

const sessionStore = useSessionStore()
const { setSession, clearSession } = sessionStore
const { session } = storeToRefs(sessionStore)

let credentials: ArgsUserCredential = {
	UserName: '',
	password: '',
}
const state = reactive({ credentials })

const login = async () => {
	const { credentials } = state
	try {
		const result = await fetch(`${apiUrl}/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
		if (result.ok) {
			const { UserName, Token } = await result.json()
			const newSession: SessionData = {
				UserName,
				Token,
				SignedIn: true,
			}
			setSession(newSession)
			console.log({ UserName, Token })
		} else {
			clearSession()
		}
	} catch (error) {
		console.log(error)
	}
}
</script>

<style lang="postcss">
div.input-field {
	@apply px-2 pb-2;
}
div.submit-button,
div.logout-form {
	@apply px-4;
}
input {
	@apply border border-black rounded;
}
</style>
