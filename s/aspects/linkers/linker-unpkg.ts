
import {Linker} from "../../types.js"

export const linkerUnpkg: Linker =
	(label, version) => `https://unpkg.com/${label}@${version}`
