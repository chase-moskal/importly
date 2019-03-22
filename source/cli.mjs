#!/bin/sh
":" //# comment; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import {default as yargs} from "yargs"
import {generate} from "./generate.mjs"

yargs
	.scriptName("importly")
	.strict()
	.usage("$0 <cmd> [args]")
	.command(
		"generate",
		"Generate an importmap from your 'importly.config'",
		{
			host: {
				alias: "h",
				type: "string",
				default: "unpkg",
				describe: "host server to load modules"
			},
			config: {
				alias: "c",
				type: "string",
				default: "importly.config",
				describe: "file path to importly config"
			}
		},
		({host, config}) => generate({host, configPath: config})
	)
	.help()
	.demandCommand()
	.argv
