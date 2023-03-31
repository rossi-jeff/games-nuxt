import { defineStore } from 'pinia'

export type SessionData = {
	UserName: string | null
	Token: string | null
	SignedIn: boolean
}

export const blankSession: SessionData = {
	UserName: null,
	Token: null,
	SignedIn: false,
}

export const useSessionStore = defineStore('session', () => {
	const session = ref(blankSession)

	const setSession = (newSession: SessionData) => {
		session.value = newSession
	}

	const clearSession = () => {
		session.value = blankSession
	}
	return { session, setSession, clearSession }
})
