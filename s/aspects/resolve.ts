
import {PackageManifest, Resolver} from "../types.js"

export async function resolve(
		manifests: PackageManifest[],
		resolver: Resolver
	) {
	return (await Promise.all(manifests.map(resolver)))
		.filter(solution => !!solution)
}
