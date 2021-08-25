
import {Linker} from "../../types.js"

export const linkerJsdelivr: Linker =
	(label, version) => `https://cdn.jsdelivr.net/npm/${label}@${version}`
