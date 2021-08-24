
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
	directory?: string
}

export enum SpecificationType {
	PackageJson,
	PackageLockJson,
}

export interface PackageJson {
	dependencies: {[key: string]: string}
	devDependencies: {[key: string]: string}
}

export interface LockDetails {
	dev: boolean
	version: string
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
	entry: string
}

export type Resolver =
	({}: PackageManifest) => Promise<undefined | PackageSolution>
