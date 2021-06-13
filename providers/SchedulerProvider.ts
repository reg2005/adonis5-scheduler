import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Scheudler from '../src/Scheduler'
import { BaseTask } from '../src/Scheduler/Task'
import { Application } from '@adonisjs/application/build/standalone'
import Logger from '@ioc:Adonis/Core/Logger'

/**
 * Scheduler provider
 */
export default class SchedulerProvider {
	public static needsApplication = true
	constructor(protected app: ApplicationContract) {}

	public async register(): Promise<void> {
		this.app.container.singleton('Adonis/Addons/Scheduler', () => {
			const app: Application = this.app.container.use('Adonis/Core/Application')
			const logger: typeof Logger = this.app.container.use('Adonis/Core/Logger')
			return new Scheudler(app.appRoot, this.app.container, logger)
		})
		this.app.container.bind('Adonis/Addons/Scheduler/Task', () => BaseTask)
	}
	public async boot(): Promise<void> {}
}
