import { Profiler } from "../../modules/profiler/profiler"
import v8 from 'v8'
import { getSnapshotFileName } from '../../lib/util/index'

export class ElectronHeapSnapshot {
	protected name: string
	protected instance: Profiler
	private fileName: string
	public constructor(instance: Profiler) {
		this.name = "ElectronHeapSnapshot" || this.constructor.name
		this.instance = instance
		this.fileName = getSnapshotFileName()
	}

	public createHeapSnapshot(): string {
		return v8.writeHeapSnapshot(this.fileName)
	}
}