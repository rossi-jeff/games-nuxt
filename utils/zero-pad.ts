export const zeroPad = (num: number, digits: number = 2) => {
	let str = num.toString()
	while (str.length < digits) str = '0' + str
	return str
}
