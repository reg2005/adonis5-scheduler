import { BaseCommand, Kernel } from '@adonisjs/ace'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Scheduler from './../src/Scheduler'
/**
 * Launch queue workers to start processing
 *
 * @version 2.0.0
 * @adonis-version 5.0+
 */
export default class SchedulerRun extends BaseCommand {
	private scheduler: Scheduler
	public static commandName = 'scheduler:run'
	public static description = 'Start one or more workers'

	public static settings = {
		loadApp: true,
	}

	constructor(app: ApplicationContract, kernel: Kernel) {
		super(app, kernel)
		this.scheduler = app.container.use('Adonis/Addons/Scheduler')
	}
	/**
	 * Execute command
	 */
	public async handle(): Promise<void> {
		this.logger.success('Scheduler are running...')
		await this.scheduler.run()
	}
}
