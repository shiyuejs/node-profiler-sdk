// import axios from 'axios'
export class Http<T> {
	protected name: string
	public constructor() {
		this.name = 'Http'
	}
	public post(url: string, data: T) {
		// axios.post(url, {
		// 	data: data
		// }).then((res: any) => {
		// 	console.log(`Status: ${res.status}`)
		// 	console.log('Body: ', res.data)
		// }).catch((err: any) => {
		// 	console.error(err)
		// })
	}

	// https://blog.csdn.net/u013379553/article/details/104871118
	public uploadFile() {
		// 
	}
}