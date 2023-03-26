export const SeaBattleMaxAxis: { H: string[]; V: number[] } = {
	H: alphabet.toUpperCase().split(''),
	V: [...Array(26).keys()].map((x) => x + 1),
}
