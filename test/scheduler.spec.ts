import { join } from 'path'
import test from 'japa'
import { Filesystem } from '@poppinss/dev-utils'
import { Ioc } from '@adonisjs/fold/build/index'
import { Application } from '@adonisjs/application/build/standalone'
import Scheduler from '../src/Scheduler'
import SchedulerProvider from '../providers/SchedulerProvider'
import { BaseTask } from '../index'
import { Logger } from '@adonisjs/logger/build/standalone'
import { LoggerConfig } from '@ioc:Adonis/Core/Logger'

export const loggerConfig: LoggerConfig = {
	name: 'TEST_APP',
	enabled: true,
	level: 'debug',
	prettyPrint: true,
}

const fs = new Filesystem(join(__dirname, '__app'))
test.group('Scheduler', () => {
	function getApp() {
		console.log('fs.basePath', fs.basePath)
		const ioc = new Ioc()
		ioc.bind('Adonis/Core/Application', () => new Application(join(fs.basePath, 'build'), {} as any, {} as any, {}))
		ioc.bind('Adonis/Core/Logger', () => new Logger(loggerConfig))
		const schedulerProvider = new SchedulerProvider(ioc)
		schedulerProvider.register()
		const scheduler: Scheduler = ioc.use('Adonis/Addons/Scheduler')
		return { scheduler }
	}
	let isHandled = false
	test('Should run with good tasks', async (assert) => {
		const { scheduler } = getApp()
		class GoodTask extends BaseTask {
			public static get schedule() {
				return '* * * * * *'
			}

			public static get useLock() {
				return true
			}

			public async handle() {
				const ms = new Date().getTime()
				console.log('handle start', ms)
				await new Promise((resolve) => setTimeout(resolve, 3000))
				isHandled = true
				console.log('handle end', ms)
			}
		}
		await scheduler.run([GoodTask])
		assert.isArray(scheduler.getRegisteredTasks())
		assert.equal(scheduler.getRegisteredTasks().length, 1)

		await new Promise((resolve) => setTimeout(resolve, 10000))
		assert.equal(isHandled, true)
	}).timeout(15000)
})
