
export function errorPrefix(prefix1 = "") {
	return (errorOrMessage, prefix2 = "") => {
		if (typeof errorOrMessage === "string") {
			const message = errorOrMessage
			return new Error(prefix1 + prefix2 + message)
		}
		else {
			const error = errorOrMessage
			error.message = prefix1 + prefix2 + error.message
			return error
		}
	}
}
