declare module '@ioc:Adonis/Addons/Scheduler' {
	export interface LockerInterface {
		check(): Promise<boolean>
		lock(): Promise<() => Promise<void>>
		unlock(): Promise<void>
	}
}
