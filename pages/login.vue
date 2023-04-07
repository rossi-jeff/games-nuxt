<template>
	<div class="login-container">
		<Head>
			<Title>Sign In</Title>
		</Head>
		<div v-if="!session.SignedIn">
			<CredentialsForm label="Sign In" @submit-form="login" />
		</div>
		<div class="logout-form" v-else>
			<button @click="clearSession">Sign Out</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { SessionData } from '../utils/session.store'

const sessionStore = useSessionStore()
const { setSession, clearSession } = sessionStore
const { session } = storeToRefs(sessionStore)

const login = async (event: any) => {
	const { UserName, password } = event
	try {
		const result = await fetch(`${apiUrl}/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ UserName, password }),
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
div.login-container {
	@apply mx-2 my-2;
}
div.logout-form button {
	@apply border border-black rounded px-2 py-1 bg-slate-200;
}
div.logout-form button:hover {
	@apply bg-slate-600 text-white;
}
</style>
