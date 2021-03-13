const sdk = require('../dist/index')

const config = sdk.setAppID('xxxx')
const profiler = new sdk.Profiler({
	intervalRate: 5000,
	repotLimit: 1
}).install()

profiler.event.on('reportHeap', (data) => {
	console.log('reportHeap', Date.now())
})

const filePath = profiler.getHeapSnapshot()
console.log('getHeapSnapshot-filePath', filePath)