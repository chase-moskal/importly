
import {resolve} from "url"

export async function unpkg({lock, name, version, packageModule, packageVersion}) {
	const imports = {}
	const v = lock ? packageVersion : version
	const url = `https://unpkg.com/${name}@${v}`
	imports[`${name}/`] = `${url}/`
	if (packageModule) imports[name] = resolve(url + "/", packageModule)
	return imports
}

export async function jsdelivr({name, version, packageModule, packageVersion, lock}) {
	const imports = {}
	const v = lock ? packageVersion : version
	const url = `https://cdn.jsdelivr.net/npm/${name}@${v}`
	imports[`${name}/`] = `${url}/`
	if (packageModule) imports[name] = resolve(url + "/", packageModule)
	return imports
}

export async function node_modules({name, version, packageModule, packageVersion, lock}) {
	const imports = {}
	const url = `/node_modules/${name}`
	imports[`${name}/`] = `${url}/`
	if (packageModule) imports[name] = resolve(url + "/", packageModule)
	return imports
}
