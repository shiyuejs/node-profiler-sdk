export class Uuid {
	private appID: string
	public constructor(appID: string) {
		this.appID = appID
	}

	private create() {
		return `${this.appID}-${this.getRandom()}`
	}

	private getRandom() {
		let str = "xxxyxxxxxxx_"
		let times = Date.now()
		let strRule = times.toString(16)
		return ((str.replace(/[xy]/g, (c) => {
			let r = Math.random() * 16 | 0,
				v = c === 'x' ? r : (r & 0x3 | 0x8)
			return v.toString(16)
		})) + strRule).toUpperCase()
	}

	public get uuid() {
        return this.create()
    }
}