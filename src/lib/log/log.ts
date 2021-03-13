import { getConfig } from "src/config/config"
import { pid } from "../env"
import { getTimeSeconds } from "../util/time"

export class Log  {
	public info(...rest: any) {
        console.log(this.prefix, ...rest)
    }

	public error(...rest: any) {
		console.error(this.prefix, ...rest)
	}

	private get prefix () {
		const config = getConfig()
		return `[${getTimeSeconds()}] ${pid}|${config.appID}|`
	}
}