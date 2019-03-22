#!/usr/bin/env node

require("yargs")

	.scriptName("litany")

	.usage("$0 <cmd> [args]")

	.command(
		"install [package-name]",
		"add a package to litany.json",
		yargs => {
			yargs.positional("package-name", {
				type: "string",
				describe: "name of the npm package to install"
			})
		},
		argv => {
			console.log("hello", argv.name, "welcome to yargs!")
		}
	)

	.help()

	.argv
