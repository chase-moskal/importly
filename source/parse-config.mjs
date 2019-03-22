
export function parseConfig(rawConfig) {
	const lines = rawConfig.split("\n")
		.map(line => line.replace(" ", ""))
		.map(line => line.trim())
		.filter(line => line.length > 0)
	const packages = lines.map(parseConfigLine)
	return packages
}

function parseConfigLine(line) {
	let id = line
	let host
	let name
	let version

	if (line.includes(":")) [id, host] = line.split(":")

	const scoped = id[0] === "@"
	if (scoped) id = id.slice(1)

	if (id.includes("@")) [name, version] = id.split("@")
	else name = id

	if (scoped) name = "@" + name
	return {name, version, host}
}
