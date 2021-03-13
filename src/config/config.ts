import { IdefaultConfig } from "../model/config"

const config: IdefaultConfig = {
	appID: '',
	profiler: {
		heap: true,
		heapSnapshot: true
	}
}

export const setConfig = (data: IdefaultConfig) => {
	return Object.assign(config, data)
}

export const setAppID = (appID: string) => {
	return setConfig(Object.assign(config, {
		appID
	}))
}

export const getConfig = () => config