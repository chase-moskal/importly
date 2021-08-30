
export class ImportlyError extends Error {
	name = this.constructor.name
}

export class ImportlyParsingError extends ImportlyError {}
export class ImportlyLookupError extends ImportlyError {}
export class ImportlyGenerationError extends ImportlyError {}
