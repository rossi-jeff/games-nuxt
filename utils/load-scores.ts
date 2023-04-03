import { apiUrl } from './api-url'

export const loadScores = async (path: string, Offset: number, Limit: number) => {
	const params: { [key: string]: number } = { Offset, Limit }
	const url = new URL(path, apiUrl)
	for (const key in params) {
		url.searchParams.append(key, params[key].toString())
	}
	try {
		const result = await fetch(url)
		if (result.ok) {
			return await result.json()
		}
	} catch (error) {
		console.log(error)
	}
}
