/**
 * @class Profiler
 * @description 性能监控基类，根据平台适配，统一获取runtime数据
 */
import { isElectronRunTime, isNodeRunTime } from "../../lib/env"
import { IProfilerOptions } from "../../model/profiler/profiler"
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

export class Profiler extends Map {
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
		const heap: ElectronHeap | NodeHeap = this.get('HeapModule')
		return {
			heapInfo: heap.getHeap(),
			heapSpaceInfo: heap.getHeapSpaceStatistics()
		}
	}

	public async repotHeapSnapshotFile() {
		const filePath = await this.getHeapSnapshotFileName()
		this.log.info('repotHeapSnapshotFile', filePath)
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
			this.set('HeapModule', new ElectronHeap(this))
		}
		if (isNodeRunTime) {
			this.set('HeapModule', new NodeHeap(this))
		}
	}

	private initHeapSnapshotModule() {
		if (isElectronRunTime) {
			this.set('HeapSnapshotModule', new ElectronHeapSnapshot(this))
		}
	}

	private monitorHeapModule() {
		if (!this.options.repotLimit || !this.options.intervalRate) {
			return
		}

		const queue = new Queue<IAPISendHeapReq>(this.options.repotLimit)
		queue.on('repot', (data: ReadonlyArray<IAPISendHeapReq>) => {
			this.log.info('repot', data)
		})
		const intervalInstance = new Intervalometer(this.options.intervalRate, (action: 'stop' | 'loop') => {
			if (action === 'loop') {
				const info = this.getHeapInfo()
				queue.add(info)
				this.log.info('HeapModule', queue.size)
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

	private async getHeapSnapshotFileName(): Promise<string> {
		const timer = starTimer('getHeapSnapshotFileName')
		const heapSnapshot: ElectronHeapSnapshot = this.get('HeapSnapshotModule')
		const filePath = await heapSnapshot.createHeapSnapshot()
		timer.done()
		return filePath
	}
}