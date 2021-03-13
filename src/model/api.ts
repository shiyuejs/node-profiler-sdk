import { IHeapInfo, IHeapSpaceInfo } from "./profiler/heap"

export interface IAPISendHeapReq {
	readonly heapInfo: IHeapInfo,
	readonly heapSpaceInfo: ReadonlyArray<IHeapSpaceInfo>
}