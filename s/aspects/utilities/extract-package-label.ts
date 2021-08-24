
export function extractPackageLabel(directory: string) {
	const parts = directory.split("/")
	const lastPart = parts[parts.length - 1]
	const secondLastPart = parts[parts.length - 2]
	const namespaced = secondLastPart.startsWith("@")
	return namespaced
		? `${secondLastPart}/${lastPart}`
		: lastPart
}
