
export const urlPreppers = {
	unpkg: ({name, version}) => `https://unpkg.com/${name}@${version}`,
	jsdelivr: ({name, version}) => `https://cdn.jsdelivr.net/npm/${name}@${version}`
}
