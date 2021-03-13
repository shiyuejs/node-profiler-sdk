import { Profiler } from "../../modules/profiler/profiler"
import v8 from 'v8'

export class NodeHeap {
	protected name: string
	protected instance: Profiler
	public constructor(instance: Profiler) {
		this.name = "NodeHeap" || this.constructor.name
		this.instance = instance
	}

	public getHeap() {
		return v8.getHeapStatistics()
	}

	public getHeapSpaceStatistics() {
		return v8.getHeapSpaceStatistics()
	}
}