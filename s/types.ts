
export interface Mapping {
	[key: string]: string
}

export interface ImportMap {
	imports?: Mapping,
	scopes?: {[key: string]: Mapping},
}

export interface PackageManifest2 {
	label: string
	version: string
	parents: string[]
}

export interface PackageInfo extends PackageManifest2 {
	entry: undefined | string
}

export interface PackageManifest {
	label: string
	version: string
	localDirectory: undefined | string
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

export interface PackageSolution {
	label: string
	version: string
	directory: string
	scope?: string
	entry?: string
}

export type Resolver =
	({}: PackageManifest) => Promise<undefined | PackageSolution>
