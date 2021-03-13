import { pid } from "../env"
import { getTimeSeconds } from "./time"

export const getSnapshotFileName = () => {
	const time = getTimeSeconds().replace(' ', '-').replace(/:/g, '')
	return `Heap-${time}-${pid}.heapsnapshot`
}