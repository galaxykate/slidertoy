let entTypes = ["character", "room", "object"]
let factClasses = ["condition", "property", "relationship", "tempRelationship"]

function fact(r, ...params) {
	return r + "(" + params.join(",") + ")"
}

