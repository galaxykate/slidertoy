function WorldType(template) {
	this.rules = template.rules
	let typeShorthand = {
		character: ["character"],
		object: ["object"],
		obj: ["object"],
		room: ["room"],
		all: ["character", "object", "room"],
		ro: ["room", "object"],
		cr: ["character", "room"],
		co: ["character", "object"],

	}
	// Process this template
	this.factTypeDirectory = {}



	$.each(template.properties, (type, data) => {
		if (typeShorthand[type] === undefined)
			console.warn("Unknown source type: ", type)

		$.each(data, (id, options) => {



			this.addFactType({
				id: id,
				factClass: "property",
				options: options,
				sourceType: typeShorthand[type],
			})
		})
	})

	$.each(template.conditions, (type, data) => {
		if (typeShorthand[type] === undefined)
			console.warn("Unknown source type: ", type)

		$.each(data, (index, id) => {

			this.addFactType({
				id: id,
				factClass: "condition",
				sourceType: typeShorthand[type],
			})
		})
	})

	$.each(template.relationships, (type, targetData) => {
		if (typeShorthand[type] === undefined)
			console.warn("Unknown source type: ", type)

		$.each(targetData, (targetType, list) => {
			$.each(list, (index, id) => {
				let unique = false;
				if (id.endsWith("*")) {
					console.log("UNIQUE")
					unique = true
					id = id.substring(0, id.length - 1)
				}

				this.addFactType({
					factClass: "relationship",
					id: id,
					unique: unique,
					sourceType: typeShorthand[type],
					targetType: typeShorthand[targetType],
				})
			})
		})
	})

	$.each(template.tempRelationships, (type, targetData) => {
		if (typeShorthand[type] === undefined)
			console.warn("Unknown source type: ", type)

		$.each(targetData, (targetType, list) => {
			$.each(list, (index, id) => {
				let unique = false;
				if (id.endsWith("*")) {
					console.log("UNIQUE")
					unique = true
					id = id.substring(0, id.length - 1)
				}
				this.addFactType({
					factClass: "tempRelationship",
					id: id,
					unique: unique,
					sourceType: typeShorthand[type],
					targetType: typeShorthand[targetType],
				})
			})
		})
	})

	this.allFacts = Object.keys(this.factTypeDirectory).map(key => this.factTypeDirectory[key])

	this.factTypeByClass = {}
	$.each(factClasses, (index, fc) => {
		this.factTypeByClass[fc] = this.allFacts.filter(f => f.factClass === fc)
	})

	console.log(this.factTypeByClass)
}

WorldType.prototype.getFactTypes = function(filterTypes) {
	let types = Object.keys(this.factTypeDirectory).map(key => this.factTypeDirectory[key])
	if (filterTypes)
		types = types.filter(filterTypes)
	return types;
}

WorldType.prototype.addFactType = function(facttype) {
	if (this.factTypeDirectory[facttype.id]) {
		console.warn("Overlapping fact ids!", this.factTypeDirectory[facttype.id], facttype)
	}

	this.factTypeDirectory[facttype.id] = facttype

}
WorldType.prototype.getMatchingFactTypes = function(factClass, sourceType) {
	return this.factTypeByClass[factClass].filter(ft => {
		return ft.sourceType.indexOf(sourceType) >= 0
	})
}