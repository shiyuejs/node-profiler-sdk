export type DoesZapCodeSpaceFlag = 0 | 1;

// 堆信息
export interface IHeapInfo {
	readonly total_heap_size: number;					// 总堆大小
	readonly total_heap_size_executable: number;		// 总堆大小可执行文件
	readonly total_physical_size: number;				// 总物理大小
	readonly total_available_size: number;				// 总可用大小
	readonly used_heap_size: number;					// 已用堆大小
	readonly heap_size_limit: number;					// 堆大小\u限制
	readonly malloced_memory: number;					// malloced\u内存
	readonly peak_malloced_memory: number;				// 峰值内存
	readonly does_zap_garbage?: DoesZapCodeSpaceFlag;
	readonly number_of_native_contexts?: number;
	readonly number_of_detached_contexts?: number;
}

// 堆空间统计信息
export interface IHeapSpaceInfo {
	readonly space_name: string					// 空间名称
	readonly space_size: number					// 空间大小
	readonly space_used_size: number			// 使用的空间大小
	readonly space_available_size: number		// 可用空间大小
	readonly physical_space_size: number		// 物理空间大小
}