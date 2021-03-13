const sdk = require('../dist/index')

const config = sdk.setAppID('xxxx')
const profiler = new sdk.Profiler({
	intervalRate: 10000,
	repotLimit: 20
}).install()

profiler.repotHeapSnapshotFile()
// const heap = profiler.getHeap()
// console.log(config)
// console.log(heap)