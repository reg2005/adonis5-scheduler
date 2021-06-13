import Scheudler from '../src/Scheduler'
import { BaseTask } from '../src/Scheduler/Task'
import { Application } from '@adonisjs/application'
import Logger from '@ioc:Adonis/Core/Logger'

/**
 * Scheduler provider
 */
export default class SchedulerProvider {
	public static needsApplication = true
	constructor(protected app: Application) {}

	public async register(): Promise<void> {
		this.app.container.singleton('Adonis/Addons/Scheduler', () => {
			const app = this.app.container.use('Adonis/Core/Application')
			const logger: typeof Logger = this.app.container.use('Adonis/Core/Logger')
			return new Scheudler(app.appRoot, this.app.container, logger)
		})
		this.app.container.bind('Adonis/Addons/Scheduler/Task', () => BaseTask)
	}
	public async boot(): Promise<void> {}
}
