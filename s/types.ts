
export interface Mapping {
	[key: string]: string
}

export interface ImportMap {
	imports?: Mapping,
	scopes?: {[key: string]: Mapping},
}

export interface PackageManifest {
	label: string
	version: string
	parents: string[]
}

export interface PackageInfo extends PackageManifest {
	entry: undefined | string
}

export enum SpecificationType {
	PackageJson,
	PackageLockJson,
}

export interface PackageJson {
	type?: string
	main?: string
	module?: string
	dependencies?: {[key: string]: string}
	devDependencies?: {[key: string]: string}
}

export interface LockDetails {
	dev: boolean
	version: string
	optional: boolean
}

export interface PackageLock {
	packages: {
		[key: string]: LockDetails
	}
}
