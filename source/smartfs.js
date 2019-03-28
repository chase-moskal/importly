
import {readFile as dumbReadFile} from "fs"

export function readFile(path, options) {
	return new Promise((resolve, reject) => {
		dumbReadFile(path, options, (error, data) => {
			if (error) reject(error)
			else resolve(data)
		})
	})
}
