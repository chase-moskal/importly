
import * as JSON5 from "json5"

function parseConfigItems(input) {
	const symbolRegex = /(?=⚙|\$|📦|&)/igm
	let items = []

	try {
		const packageJson = JSON.parse(input)
		items = typeof packageJson.importly === "string"
			? packageJson.importly.split(symbolRegex)
			: packageJson.importly
	}
	catch (error) {
		items = input.split(symbolRegex)
	}

	return items
}

export function parseConfig(input) {
	if (/^\s*\{/.test(input)) {
		const json = JSON5.parse(input)
		input = json.importly.join("\n")
	}

	const items = parseConfigItems(input)
	const statements = items
		.map(item => item.trim())
		.filter(item => item.length > 0)
		.map(item => {
			const [, symbol, body] = /^(📡|\#|⚙|\$|📦|&)\s*([\s\S]*)$/i.exec(item)
			return {symbol, body}
		})

	const hostStatements = filterStatementsBySymbols(statements, ["📡", "#"])
	const packageStatements = filterStatementsBySymbols(statements, ["📦", "&"])
	// const settingStatements = filterStatementsBySymbols(statements, ["⚙", "$"])

	return {
		hosts: parseHostStatements(hostStatements),
		packages: parsePackages(packageStatements)
		// settings: {
		// 	hosts: parseHostsSetting(settingStatements)
		// },
	}
}

function filterStatementsBySymbols(statements, symbols) {
	return statements.filter(({symbol}) => symbols.includes(symbol))
}

// function parseHostsSetting(settingStatements) {
// 	let hosts = []
// 	const hostStatements = settingStatements.filter(statement => /^.*hosts?/i.test(statement.body))
// 	if (hostStatements.length > 1) throw new Error(`can't handle more than one 'host' setting`)
// 	if (hostStatements.length === 1) {
// 		const [, content] = hostStatements[0].body.match(/^.*hosts?:?=?(.+)$/i)
// 		hosts = content.split(/[\s,]+/).map(x => x.trim()).filter(x => !!x)
// 	}
// 	return hosts
// }

function parseHostStatements(hostStatements) {
	const hosts = []
	for (const statement of hostStatements) {
		if (statement) {
			const extracted = statement.body.split(/[\s,]+/)
				.map(s => s.trim())
				.filter(s => !!s)
			for (const extractee of extracted) hosts.push(extractee)
		}
	}
	return hosts
}

function parsePackages(packageStatements) {
	const packages = packageStatements.map(parsePackageStatement)
	const duplicates = getPackageDuplicates(packages)
	if (duplicates.length > 0) throw new Error(
		`these packages are duplicated and appear more than once [${duplicates.join(", ")}]`
	)
	return packages
}

function parsePackageStatement(statement) {
	const {body} = statement

	let id = body
	let host
	let name
	let version

	if (body.includes(":")) [id, host] = body.split(":")

	const scoped = id[0] === "@"
	if (scoped) id = id.slice(1)

	if (id.includes("@")) [name, version] = id.split("@").map(x => x.trim())
	else name = id

	if (scoped) name = "@" + name
	return {name, version, host}
}

function getPackageDuplicates(packages) {
	const done = []
	const duplicates = []

	for (const package1 of packages) {
		if (done.includes(package1.name)) continue
		for (const package2 of packages) {
			if (package1 !== package2) {
				if (package1.name === package2.name) {
					duplicates.push(package1.name)
				}
			}
		}
		done.push(package1.name)
	}

	return duplicates
}
