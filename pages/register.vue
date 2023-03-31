<template>
	<div class="register-container">
		<div class="register-form" v-if="!state.registered">
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
				<button @click="register">Register</button>
			</div>
		</div>
		<div v-else>
			Thank You for registering. Please <NuxtLink to="/login">Sign In</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ArgsUserCredential } from '../utils/types/args-user-credential.type'

let credentials: ArgsUserCredential = {
	UserName: '',
	password: '',
}
const state = reactive({ credentials, registered: false })

const register = async () => {
	try {
		const { credentials } = state
		const result = await fetch(`${apiUrl}/api/auth/register`, {
			method: 'POST',
			body: JSON.stringify(credentials),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
		if (result.ok) {
			const user = await result.json()
			console.log(JSON.stringify(user))
			state.registered = true
		} else {
			state.registered = false
		}
	} catch (error) {
		console.log(error)
	}
}
</script>
