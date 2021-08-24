
import meow from "meow"

import {parse} from "./aspects/parse.js"
import {resolve} from "./aspects/resolve.js"
import {generate} from "./aspects/generate.js"
import {readStdin} from "./aspects/utilities/read-stdin.js"
import {localNodeResolver} from "./aspects/resolvers/local-node-resolver.js"

void async function cli() {

	const stdin = readStdin()

	const {flags} = meow({
		importMeta: import.meta,
		flags: {
			dev: {
				type: "boolean",
				alias: "d",
			},
			min: {
				type: "boolean",
				alias: "m",
			},
		}
	})

	const manifests = parse({specification: stdin, dev: flags.dev})
	const solutions = await resolve(manifests, localNodeResolver)
	const importmap = generate(solutions)

	process.stdout.write(
		flags.min
			? JSON.stringify(importmap) + "\n"
			: "\n" + JSON.stringify(importmap, undefined, "\t") + "\n"
	)
}()
