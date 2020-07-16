import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { join } from 'path'
import { promises } from 'fs'
export const debug = require('debug')('adonis:scheduler')

export function isObject(value: any): boolean {
	const type = typeof value
	return value !== null && (type === 'object' || type === 'function')
}
export function getSchedulerCompiledClassesPath(app: ApplicationContract) {
	return join(process.cwd(), '/build/', app.resolveNamespaceDirectory('scheduler') || 'app/Tasks')
}
export function getSchedulerClassesPath(app: ApplicationContract) {
	return join(process.cwd(), app.resolveNamespaceDirectory('scheduler') || 'app/Tasks')
}
export async function dirIsExists(path) {
	try {
		return !!(await promises.readdir(path))
	} catch (e) {
		return false
	}
}
export async function getSchedulerTmpPath() {
	const path = join(process.cwd(), 'tmp')
	try {
		if (!(await dirIsExists(path))) {
			await promises.mkdir(path)
		}
	} catch (e) {
		console.error(e.message)
	}
	return path
}

export const listFiles = (path: string): Promise<string[]> => {
	return promises.readdir(path)
}
