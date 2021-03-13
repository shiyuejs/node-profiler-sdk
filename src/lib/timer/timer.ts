import { Log } from '../log/log'

const log = new Log()
export const starTimer = (action: string) => {
	const star = Date.now()
	return {
		done: () => {
			log.info(`${action}: timer took ${Date.now() - star}ms`)
		}
	}
}