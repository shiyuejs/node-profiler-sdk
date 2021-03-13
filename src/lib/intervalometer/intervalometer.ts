
export class Intervalometer {
	private intervalRate: number
	private handle: (action: 'stop' | 'loop') => void
	private timer: NodeJS.Timeout | null = null
   	public constructor(intervalRate: number, handle: (action: 'stop' | 'loop') => void) {
		this.intervalRate = intervalRate
		this.handle = handle
		this.init()
    }

	public stop() {
		if (this.timer) {
			clearInterval(this.timer)
			this.handle('stop')
		}
	}

	private init = () => {
		this.timer = setInterval(() => {
			this.handle('loop')
		}, this.intervalRate)
	}
}
