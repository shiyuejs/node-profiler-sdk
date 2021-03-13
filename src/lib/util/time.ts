
const timeFormat = (num: number) => {
	if (num < 10) {
		return "0" + num
	}
	return num
}

const generate = () => {
	let time = new Date()
	const getMilliseconds = time.getMilliseconds()
	const day = `${time.getFullYear()}-${timeFormat(time.getMonth() + 1)}-${timeFormat(time.getDate())}`
	const hours = time.toTimeString().slice(0, 8)
	return {
		timeStamp: +time,
		day: day,
		hours: hours,
		seconds: getMilliseconds
	}
}

export const getTimeSeconds = () => {
	const time = generate()
	return `${time.day} ${time.hours}`
}