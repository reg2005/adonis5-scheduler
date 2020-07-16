import ms from 'ms'
import Locker from './Locker'
import Logger from '@ioc:Adonis/Core/Logger'
import { LockerInterface } from '@ioc:Adonis/Addons/Scheduler'

/**
 * @module BaseTask
 * @description Task base class
 */
export class BaseTask {
	public name: string
	public locker: LockerInterface
	public startedAt: number
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `tmpPath`
	 */
	public static get useLock(): boolean {
		return false
	}
	public static get schedule(): string {
		return '* * * * *'
	}

	constructor(protected tmpPath: string, protected logger: typeof Logger) {
		this.name = this._getName()
		this.locker = this._getLocker()
	}

	/**
	 * Example input JasperEventsDrop
	 * Example output jasper:events:drop
	 */
	protected _getName(): string {
		return this.constructor.name
			.replace(/([A-Z])/g, ' $1')
			.split(' ')
			.splice(1)
			.map((str) => str.toLowerCase())
			.join(':')
	}
	protected _getLocker(): LockerInterface {
		return new Locker(this.name, this.tmpPath)
	}

	public async _run() {
		const useLock = ((this.constructor as unknown) as typeof BaseTask).useLock

		if (useLock) {
			const locked = await this.locker.check()
			if (locked) {
				this.logger.warn(`${this.constructor.name}: Lock file exist so current task is running, let's skip`)
				return
			}

			await this.locker.lock()
		}

		this.startedAt = new Date().getMilliseconds()

		try {
			/**
			 * Worker task handle
			 */
			await this.handle()
		} catch (e) {
			this.logger.error(e)
		}

		if (useLock) {
			await this.locker.unlock()
		}
	}
	public async handle() {}

	/**
	 * Get task running time duration
	 */
	public duration(source = false): number {
		let duration = new Date().getMilliseconds() - this.startedAt

		if (source) {
			return duration
		}

		duration = ms(duration)
		return duration
	}
}
