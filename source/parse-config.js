
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
	const items = parseConfigItems(input)

	const statements = items
		.map(item => item.trim())
		.filter(item => item.length > 0)
		.map(item => {
			const [, symbol, body] = /^(⚙|\$|📦|&)\s*([\s\S]*)$/i.exec(item)
			return {symbol, body}
		})

	const settingStatements = filterStatementsBySymbols(statements, ["⚙", "$"])
	const packageStatements = filterStatementsBySymbols(statements, ["📦", "&"])

	return {
		settings: {
			host: parseHostSetting(settingStatements)
		},
		packages: parsePackages(packageStatements)
	}
}

function filterStatementsBySymbols(statements, symbols) {
	return statements.filter(({symbol}) => symbols.includes(symbol))
}

function parseHostSetting(settingStatements) {
	let host
	const hostStatements = settingStatements.filter(statement => /^.*host/i.test(statement.body))
	if (hostStatements.length > 1) throw new Error(`can't handle more than one 'host' setting`)
	if (hostStatements.length === 1) {
		const [, content] = hostStatements[0].body.match(/^.*host:?=?(.+)$/i)
		host = JSON5.parse(content)
	}
	return host
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

	if (id.includes("@")) [name, version] = id.split("@")
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
