
import {queryPackageJson} from "./query-package-json.js"

export async function unpkg({name, version}) {
	const info = await queryPackageJson(`https://unpkg.com/${name}@${version}/package.json`)
	return {...info, name, version}
}

export async function jsdelivr({name, version}) {
	const info = await queryPackageJson(`https://cdn.jsdelivr.net/npm/${name}@${version}/package.json`)
	return {...info, name, version}
}
