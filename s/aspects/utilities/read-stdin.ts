
import {readFileSync} from "fs"

export function readStdin() {
	return readFileSync(process.stdin.fd, "utf-8")
}
