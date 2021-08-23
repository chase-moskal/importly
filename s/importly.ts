
import json5 from "json5"
import {resolve} from "path"
import {readFile} from "fs/promises"

export async function importly(options: {
		dev: boolean
		packageLock: string
	}) {

	const packages = await readPackages({
		...options,
		resolver: localResolver,
	})

	console.log(packages)
}

export interface PackageDetails {
	dev: boolean
}

export interface PackageLock {
	packages: {
		[key: string]: PackageDetails
	}
}

export interface Package {
	label: string
	directory: string
	entry: undefined | string
}

export type Resolver = (info: [string, PackageDetails]) => Promise<Package>

export function extractPackageLabel(directory: string) {
	const parts = directory.split("/")
	const lastPart = parts[parts.length - 1]
	const secondLastPart = parts[parts.length - 2]
	const namespaced = /^\@/.test(secondLastPart)
	return namespaced
		? `${secondLastPart}/${lastPart}`
		: lastPart
}

export const localResolver: Resolver = (
	async([directory]) => {
		const packageJson = json5.parse(
			await readFile(`${directory}/package.json`, "utf-8")
		)
		return {
			directory,
			entry: packageJson.main
				? resolve(`${directory}/${packageJson.main}`)
				: undefined,
			label: extractPackageLabel(directory),
		}
	}
)

export function readPackages({
		dev,
		packageLock: text,
		resolver,
	}: {
		dev: boolean
		packageLock: string
		resolver: Resolver
	}) {

	const packageLock: PackageLock = json5.parse(text)

	if (!packageLock.packages)
		throw new Error("invalid: package-lock.json (no packages found)")

	return Promise.all(
		Object.entries(packageLock.packages)
			.filter(([directory]) => !!directory)
			.filter(([,details]) => dev ? true : !details.dev)
			.map(resolver)
	)
}
