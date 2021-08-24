
import {Resolver} from "./types.js"
import {parse} from "./aspects/parse.js"
import {resolve} from "./aspects/resolve.js"
import {generate} from "./aspects/generate.js"

export async function importly({dev, specification, resolver}: {
		dev: boolean
		specification: string
		resolver: Resolver
	}) {
	const manifests = parse({dev, specification})
	const solutions = await resolve(manifests, resolver)
	return JSON.stringify(generate(solutions), undefined,"\t")
}
