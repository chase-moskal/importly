
import json5 from "json5"
import {resolve} from "path"
import {readFile} from "fs/promises"

export async function importly({dev, specification, resolver}: {
		dev: boolean
		specification: string
		resolver: Resolver
	}) {
	const manifests = parse({dev, specification})
	const solutions = await resolution(manifests, resolver)
	return generateImportMap(solutions)
}

export async function resolution(
		manifests: PackageManifest[],
		resolver: Resolver
	) {
	return (await Promise.all(manifests.map(resolver)))
		.filter(solution => !!solution)
}

export interface Mapping {
	[key: string]: string
}

export interface ImportMap {
	imports?: Mapping,
	scopes?: {[key: string]: Mapping},
}

export function generateImportMap(solutions: PackageSolution[]) {
	const importmap: ImportMap = {
		imports: {},
		scopes: {},
	}
	for (const solution of solutions) {
		const scoped = isScopedDependency(solution)
		const {label, directory, entry} = solution
		if (scoped) {
			const mapping = importmap.scopes[scoped.directory + "/"] ?? {}
			mapping[label + "/"] = directory + "/"
			if (entry)
				mapping[label] = entry
			importmap.scopes[scoped.directory + "/"] = mapping
		}
		else {
			importmap.imports[label + "/"] = directory + "/"
			if (entry)
				importmap.imports[label] = entry
		}
	}
	return importmap
}

export function isScopedDependency({directory}: PackageSolution) {
	const parts = directory.split("node_modules/")
	return parts.length > 2
		? {
			directory: parts
				.slice(0, parts.length - 1)
				.join("node_modules/")
				.slice(0, -1)
		}
		: false
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

export class ImportlyError extends Error {}
export class ImportlyReadingError extends ImportlyError {}

export function parse({dev, specification}: {
		dev: boolean
		specification: string
	}): PackageManifest[] {
	try {
		const json = json5.parse(specification)

		const type: SpecificationType = json.packages
			? SpecificationType.PackageLockJson
			: SpecificationType.PackageJson
		
		switch (type) {
			case SpecificationType.PackageLockJson:
				return readPackageLockJson({dev, json})
			case SpecificationType.PackageJson:
				return readPackageJson({dev, json})
			default:
				throw new ImportlyReadingError("invalid package manifest")
		}
	}
	catch (error) {
		throw new ImportlyReadingError("unable to parse manifest")
	}
}

export function readPackageJson({dev, json}: {
		dev: boolean
		json: PackageJson
	}): PackageManifest[] {

	const dependencies = {
		...(json.dependencies ?? {}),
		...(dev ? (json.devDependencies ?? {}) : {}),
	}

	return Object.entries(dependencies)
		.map(([label, version]) => ({label, version}))
}

export function readPackageLockJson({dev, json}: {
		dev: boolean
		json: PackageLock
	}): PackageManifest[] {

	type Filter = ([]: [string, LockDetails]) => boolean
	
	const filterForActualDependencies: Filter =
		([directory]) => !!directory

	const filterDevDependencies: Filter =
		dev
			? () => true
			: ([,details]) => !details.dev

	return Object.entries(json.packages)
		.filter(filterForActualDependencies)
		.filter(filterDevDependencies)
		.map(([directory, {version}]) => ({
			version,
			directory,
			label: extractPackageLabel(directory),
		}))
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

export interface Package {
	label: string
	directory: string
	entry: undefined | string
}

export interface PackageSolution {
	label: string
	version: string
	directory: string
	entry: string
}

export type Resolver =
	({}: PackageManifest) => Promise<undefined | PackageSolution>

export const localNodeResolver: Resolver = async({
		label,
		version,
		directory = `node_modules/${label}`,
	}) => {
	try {
		const packageJson = json5.parse(
			await readFile(`${directory}/package.json`, "utf-8")
		)
		return {
			label,
			version,
			directory,
			entry: packageJson.main
				? resolve(`${directory}/${packageJson.main}`)
				: undefined,
		}
	}
	catch (error) {
		return undefined
	}
}

export function extractPackageLabel(directory: string) {
	const parts = directory.split("/")
	const lastPart = parts[parts.length - 1]
	const secondLastPart = parts[parts.length - 2]
	const namespaced = secondLastPart.startsWith("@")
	return namespaced
		? `${secondLastPart}/${lastPart}`
		: lastPart
}
