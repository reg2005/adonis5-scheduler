import test from 'japa'
import AdonisApplication from 'adonis-provider-tester'
import Scheduler from '../src/Scheduler'
import SchedulerProvider from '../providers/SchedulerProvider'
import { BaseTask } from '../index'
import { LoggerConfig } from '@ioc:Adonis/Core/Logger'

export const loggerConfig: LoggerConfig = {
	name: 'TEST_APP',
	enabled: true,
	level: 'debug',
	prettyPrint: true,
}

test.group('Scheduler', (group) => {
	let adonisApp: AdonisApplication

	group.before(async () => {
		adonisApp = await AdonisApplication.initApplication([SchedulerProvider])
	})

	group.after(async () => {
		await adonisApp.stopServer()
	})

	let withLockCounter = 0
	let withoutLockCounter = 0
	test('Should run with good tasks', async (assert) => {
		const scheduler: Scheduler = adonisApp.application.container.use('Adonis/Addons/Scheduler')
		class GoodTaskWithLock extends BaseTask {
			public static get schedule() {
				return '* * * * * *'
			}

			public static get useLock() {
				return true
			}

			public async handle() {
				const ms = new Date().getTime()
				console.log(this.name, 'handle start', ms)
				await new Promise((resolve) => setTimeout(resolve, 3000))
				withLockCounter++
				console.log(this.name, 'handle end', ms)
			}
		}
		class GoodTaskWithoutLock extends BaseTask {
			public static get schedule() {
				return '* * * * * *'
			}

			public static get useLock() {
				return false
			}

			public async handle() {
				const ms = new Date().getTime()
				console.log(this.name, 'handle start', ms)
				await new Promise((resolve) => setTimeout(resolve, 3000))
				withoutLockCounter++
				console.log(this.name, 'handle end', ms)
			}
		}
		await scheduler.run([GoodTaskWithLock, GoodTaskWithoutLock])
		assert.isArray(scheduler.getRegisteredTasks())
		assert.equal(scheduler.getRegisteredTasks().length, 2)

		await new Promise((resolve) => setTimeout(resolve, 10000))
		console.log({ withoutLockCounter, withLockCounter })
		assert.isTrue(withLockCounter < 5)
		assert.isTrue(withoutLockCounter > 5)
	}).timeout(15000)
})
