
// import json5 from "json5"
// import {readFile} from "fs/promises"
// import {ImportlyResolutionError} from "../errors.js"
// import {PackageManifest, PackageSolution} from "../../types.js"
// import {determinePackageEntry} from "../utilities/determine-package-entry.js"

// export async function resolveLocallyForNode({
// 		root,
// 		manifests,
// 		nodeModuleDirectory,
// 	}: {
// 		root: string
// 		nodeModuleDirectory: string
// 		manifests: PackageManifest[]
// 	}): Promise<PackageSolution[]> {

// 	const solutions = await Promise.all(
// 		manifests.map(async manifest => {
// 			const directory = manifest.localDirectory
// 				?? `${nodeModuleDirectory}/${manifest.label}`
// 			const path = `${directory}/package.json`
// 			try {
// 				const packageJson = json5.parse(
// 					await readFile(path, "utf-8")
// 				)
// 				return <PackageSolution>{
// 					label: manifest.label,
// 					version: manifest.version,
// 					directory,
// 					entry: determinePackageEntry(directory, packageJson),
// 					scope: 
// 				}
// 			}
// 			catch (error) {
// 				throw new ImportlyResolutionError(`not found: "${path}"`)
// 			}
// 		})
// 	)
// 	return solutions.filter(s => !!s)
// }
