import { IdefaultConfig } from "../config"
export interface IProfilerOptions extends IdefaultConfig {
	readonly intervalRate?: number
	readonly repotLimit?: number
}

export enum ProfilerModuleName {
	HeapModule = 'HeapModule',
	HeapSnapshotModule = 'HeapSnapshotModule'
}

export enum ProfilerEventAction {
	reportHeap = 'reportHeap'	// 上报内存堆信息
}