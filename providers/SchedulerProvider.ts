import { IocContract } from '@adonisjs/fold'
import Scheudler from '../src/Scheduler'
import { BaseTask } from '../src/Scheduler/Task'
import { Application } from '@adonisjs/application/build/standalone'
import Logger from '@ioc:Adonis/Core/Logger'

/**
 * Scheduler provider
 */
export default class SchedulerProvider {
	constructor(protected container: IocContract) {}

	public register() {
		this.container.singleton('Adonis/Addons/Scheduler', () => {
			const app: Application = this.container.use('Adonis/Core/Application')
			const logger: typeof Logger = this.container.use('Adonis/Core/Logger')
			return new Scheudler(app.appRoot, this.container, logger)
		})
		this.container.bind('Adonis/Addons/Scheduler/Task', () => BaseTask)
	}
}
