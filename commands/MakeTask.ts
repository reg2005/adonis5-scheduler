import { BaseCommand, args, Kernel } from '@adonisjs/ace'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { getSchedulerClassesPath } from './../src/utils'
import { join } from 'path'
/**
 * Generate task from template
 *
 * @version 1.0.0
 * @adonis-version 5.0+
 */
export default class MakeTask extends BaseCommand {
	public static commandName = 'make:task'
	public static description = 'Generate task from template'

	@args.string({ description: 'Name of the task', required: true })
	public name: string

	public static settings = {
		loadApp: true,
	}

	constructor(application: ApplicationContract, kernel: Kernel) {
		super(application, kernel)
		this.application = application
	}
	/**
	 * Execute command
	 */
	public async handle(): Promise<void> {
		try {
			// parse respective templates
			const templatePath = join(__dirname, `../templates/taskTemplate.txt`)
			this.generator
				.addFile(this.name, { pattern: 'pascalcase', form: 'singular' })
				.stub(templatePath)
				.destinationDir(getSchedulerClassesPath(this.application))
				.useMustache()
				.appRoot(this.application.cliCwd || this.application.appRoot)

			await this.generator.run()
		} catch (e) {
			console.error(e)
			this.logger.error('Failed to generate task class with error ' + e.message)
		}
	}
}
