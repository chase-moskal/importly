#!/bin/sh
":" //# comment; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import {default as yargs} from "yargs"

import {generate} from "./generate.mjs"

yargs
	.scriptName("greenlit")
	.usage("$0 <cmd> [args]")
	.command(
		"generate [host] [config-path]",
		"create an importmap, based on greenlit.config",
		yargs => yargs
			.positional("host", {
				type: "string",
				default: "unpkg",
				describe: "host server to load modules"
			})
			.positional("config-path", {
				type: "string",
				default: "greenlit.config",
				describe: "file path to greenlit config"
			}),
		generate
	)
	.help()
	.showHelpOnFail(false, "use --help to see options")
	.argv

// 		async({cdn}) => {
// 			const config = JSON.parse(await fs.readFile("./greenlit.json"))
// 			const {detailedPackages} = parseConfig({config, defaultCdn: cdn})

// 			const pending = detailedPackages.map(async({cdn, name, version}) => {
// 				const urlMaker = urlMakers[cdn]

// 				if (!urlMaker)
// 					error(`unknown cdn '${cdn}' for package '${name}'`)

// 				let url = urlMaker({name, version})
// 				const packageJsonUrl = `${url}/package.json`
// 				let mainModule
// 				let finalVersion = version

// 				try {
// 					const packageJson = await request({
// 						method: "get",
// 						uri: packageJsonUrl,
// 						json: true
// 					})
// 					finalVersion = packageJson.version
// 					mainModule = packageJson.module
// 					url = urlMaker({name, version: finalVersion})
// 				}
// 				catch (error) {
// 					console.log(`FAIL ${packageJsonUrl}`)
// 				}
// 				const imports = {
// 					[`${name}/`]: `${url}/`
// 				}
// 				if (mainModule) imports[`${name}`] = `${url}/${mainModule}`
// 				return imports
// 			})

// 			const loadedPackages = await Promise.all(pending)
// 			let imports = {}
// 			for (const loadedPackage of loadedPackages)
// 				imports = {...imports, ...loadedPackage}
// 			const importmap = {imports}

// 			process.stdout.write(JSON.stringify(importmap, null, 2))

// 			// for (const package of Object.keys(config.packages)) {
// 			// 	const packageInfo = config.packages[package]
// 			// 	let version
// 			// 	let packageCdn = cdn
// 			// 	if (typeof packageInfo === "string") {
// 			// 		version = packageInfo
// 			// 	}
// 			// 	else {
// 			// 		version = packageInfo.version
// 			// 		if (!version) error(`'version' field required when object passed as package info`)
// 			// 		if (packageInfo.cdn) packageCdn = packageInfo.cdn
// 			// 	}
// 			// 	const urlMaker = urlMakers[cdn]
// 			// 	if (!urlMaker) error(`unknown cdn '${cdn}'`)
// 			// 	const url = urlMaker({package, version})
// 			// 	console.log({package, version, url})
// 			// }

// 			// console.log("GENERATE", config)
// 		}
// 	)

// 	.help()

// 	.argv
