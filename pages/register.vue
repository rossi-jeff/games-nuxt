<template>
	<div class="register-container">
		<div class="register-form" v-if="!state.registered">
			<CredentialsForm label="Register" @submit-form="register" />
		</div>
		<div v-else>
			Thank You for registering. Please <NuxtLink to="/login">Sign In</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
const state = reactive({ registered: false })

const register = async (event: any) => {
	const { UserName, password } = event
	try {
		const result = await fetch(`${apiUrl}/api/auth/register`, {
			method: 'POST',
			body: JSON.stringify({ UserName, password }),
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

<style lang="postcss">
div.register-container {
	@apply mx-2 my-2;
}
</style>
