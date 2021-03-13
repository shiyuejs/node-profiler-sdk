
export class Http<T> {
	public constructor(data: T) {
		console.log('http-send', data)
	}
}