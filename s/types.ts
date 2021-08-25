
export type ImportMapGenerator = ({}: {
	root: string
	semver: string
	manifests: PackageManifest[]
}) => ImportMap

export enum InputType {
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

export interface PackageLock {
	packages: {
		[key: string]: LockDetails
	}
}

export interface LockDetails {
	dev: boolean
	version: string
	optional: boolean
}

export interface PackageOrder {
	label: string
	version: string
	parents: string[]
}

export interface PackageManifest extends PackageOrder {
	entry: undefined | string
}

export interface Mapping {
	[key: string]: string
}

export interface ImportMap {
	imports?: Mapping,
	scopes?: {[key: string]: Mapping},
}
