import lockfile from 'proper-lockfile'
import path from 'path'
import fs from 'fs'
import { LockerInterface } from '@ioc:Adonis/Addons/Scheduler'
export default class Locker implements LockerInterface {
	private lockFilename: string
	constructor(private name: string, protected lockDir: string) {
		this.lockFilename = this._getLockFilePath()
		fs.mkdirSync(this.lockDir, { recursive: true })
		// fs.writeFileSync(this.lockFilename, '')
	}

	private _getLockFilePath() {
		return path.join(this.lockDir, `${this.name}`)
	}

	public check() {
		return lockfile.check(this.lockFilename, { realpath: false })
	}

	public lock() {
		return lockfile.lock(this.lockFilename, { realpath: false })
	}

	public unlock() {
		return lockfile.unlock(this.lockFilename, { realpath: false })
	}
}
