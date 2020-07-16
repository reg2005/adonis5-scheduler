import { RuntimeException as BasicRuntimeException } from '@adonisjs/generic-exceptions'

/**
 * Class to throw runtime exceptions
 *
 * @class RuntimeException
 * @constructor
 */
export class RuntimeException extends BasicRuntimeException {
	/**
	 * This exception is raised when task an undefined schedule
	 */
	public static undefinedTaskSchedule(task: string) {
		return new this(`${task} is not defined on schedule value`, 500, 'E_INVALID_TASK_SCHEDULE')
	}

	/**
	 * This exception is raised when task an undefined handle
	 */
	public static undefinedTaskHandle(task: string) {
		return new this(`${task} is not defined on handle value`, 500, 'E_INVALID_TASK_HANDLE')
	}

	/**
	 * This exception is raised when task an undefined handle
	 */
	public static undefinedInstanceTask(task: string) {
		return new this(`${task} is not extend of class Task`, 500, 'E_INVALID_TASK_INSTANCE')
	}

	/**
	 * This exception is raised when task an undefined handle
	 */
	public static notFoundTask(dir: string) {
		return new this(`Not found task dir ${dir}`, 500, 'E_INVALID_SCHEDULER_DIR')
	}
}
