
import { EventEmitter } from 'events'
export class Queue<T> extends EventEmitter {
	protected name: string
	private repotLimit: number
	private data: Array<T> = []
	public constructor(repotLimit: number) {
		super()
		this.name = "Queue" || this.constructor.name
		this.repotLimit = repotLimit
	}

	public add(item: T) {
		this.data.push(item)
		if (this.size > this.repotLimit) {
			this.emit('repot', this.data.splice(0, this.repotLimit), this.size)
		}
	}

	public get size() {
		return this.data.length
	}
}
