export const formatElapsedSeconds = (elapsed: number) => {
	const seconds = elapsed % 60
	const minutes = Math.floor(elapsed / 60)
	return `${minutes}:${zeroPad(seconds)}`
}