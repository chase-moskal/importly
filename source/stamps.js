
export const stamps = {
	node_modules: ({name, version}) => `/node_modules/${name}`,
	unpkg: ({name, version}) => `https://unpkg.com/${name}@${version}`,
	jsdelivr: ({name, version}) => `https://cdn.jsdelivr.net/npm/${name}@${version}`
}
