/**
 * @class Profiler
 * @description 性能监控基类，根据平台适配，统一获取runtime数据
 */
import { isElectronRunTime, isNodeRunTime } from "../../lib/env"
import { IProfilerOptions, ProfilerEventAction, ProfilerModuleName } from "../../model/profiler/profiler"
import { ElectronHeap } from '../../runtime/electron/heap'
import { NodeHeap } from "../../runtime/node/heap"
import { Uuid } from '../../lib/uuid'
import { getConfig } from "src/config/config"
import { ElectronHeapSnapshot } from '../../runtime/electron/heap-snapshot'
import { Intervalometer } from '../../lib/intervalometer/intervalometer'
import { IAPISendHeapReq } from "src/model/api"
import { Queue } from '../../lib/queue/queue'
import { INTERVAL_RATE, REPOT_LIMIT } from "src/model/constant"
import { Log } from '../../lib/log/log'
import { starTimer } from '../../lib/timer/timer'
import { ApiSendHeap } from '../../api/api'
import { EventEmitter } from 'events'

export class Profiler extends Map {
	public event: EventEmitter = new EventEmitter()
	protected name: string
	private options: IProfilerOptions
	private log: Log = new Log()
	public constructor(options: IProfilerOptions) {
		super()
		this.name = "Profiler" || this.constructor.name
		this.options = Object.assign({
			intervalRate: INTERVAL_RATE,
			repotLimit: REPOT_LIMIT
		}, getConfig(), options)
	}

	public install(): Profiler {
		this.init()
		return this
	}

	public changeConfig(options: IProfilerOptions) {
		this.options = options
	}

	public get config() {
		return this.options
	}

	public getHeapInfo(): IAPISendHeapReq {
		const heap: ElectronHeap | NodeHeap = this.get(ProfilerModuleName.HeapModule)
		return {
			heapInfo: heap.getHeap(),
			heapSpaceInfo: heap.getHeapSpaceStatistics()
		}
	}

	public getHeapSnapshot(): string {
		const timer = starTimer('getHeapSnapshotFileName')
		const heapSnapshot: ElectronHeapSnapshot = this.get(ProfilerModuleName.HeapSnapshotModule)
		const filePath = heapSnapshot.createHeapSnapshot()
		timer.done()
		return filePath
	}

	private init() {
		this.getUuid()
		this.initHeapModule()
		this.initHeapSnapshotModule()
		this.monitorHeapModule()
	}

	private getUuid() {
		const uuid = new Uuid(this.options.appID)
		this.changeConfig(Object.assign(this.options, {
			uuid: uuid.uuid
		}))
	}

	private initHeapModule() {
		if (isElectronRunTime) {
			this.set(ProfilerModuleName.HeapModule, new ElectronHeap(this))
		}
		if (isNodeRunTime) {
			this.set(ProfilerModuleName.HeapModule, new NodeHeap(this))
		}
	}

	private initHeapSnapshotModule() {
		if (isElectronRunTime) {
			this.set(ProfilerModuleName.HeapSnapshotModule, new ElectronHeapSnapshot(this))
		}
	}

	private monitorHeapModule() {
		if (!this.options.repotLimit || !this.options.intervalRate) {
			return
		}

		const queue = new Queue<IAPISendHeapReq>(this.options.repotLimit)
		queue.on('repot', async (data: ReadonlyArray<IAPISendHeapReq>) => {
			this.event.emit(ProfilerEventAction.reportHeap, data)
			await ApiSendHeap(data)
		})
		const intervalInstance = new Intervalometer(this.options.intervalRate, (action: 'stop' | 'loop') => {
			if (action === 'loop') {
				const info = this.getHeapInfo()
				queue.add(info)
				this.log.info('intervalometer', queue.size)
			}
		})

		// 开关
		if (!this.options.profiler.heap) {
			if (intervalInstance) {
				intervalInstance.stop()
			}
			return
		}
	}
}