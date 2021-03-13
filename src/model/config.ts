
export interface IProfilerFunSwitch {
	readonly heap: boolean
	readonly heapSnapshot: boolean
}

export interface IdefaultConfig {
	readonly appID: string
	readonly profiler: IProfilerFunSwitch	// 监控功能的上报开关
}