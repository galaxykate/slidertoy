function World(template) {

	this.type = new WorldType(template);

	// Create a world of this type
	this.entDirectory = {}
	this.events = []
	this.propOptions = {}

	// Get all the property options from this template
	// We will need these for choosing new options
	$.each(template.properties, (type, set) => {
		$.each(set, (key, options) => {
			if (this.propOptions[key] !== undefined)
				console.warn("duplicate property '" + key + "' in prop set '" + type + "'")
			this.propOptions[key] = options;
		})
	})


	// Create some objects, rooms, and characters
	entTypes.forEach(type => {
		let count = template.count[type]
		entCount[type] = 0;
		for (var i = 0; i < count; i++) {


			let ent = new Entity(this, type);

			// Add this to the directory
			this.entDirectory[ent.id] = ent;
		}
	})

	this.createRandomFacts(.05);
}

// Get all target ids for this option
World.prototype.getTargetOptionsFor = function(ent, key) {
	let ft = this.getFactType(key)


	let match = this.getAllEntities().filter(e1 => {
		if (e1 != ent || ft.allowSelfTargeting) {

			return ft.targetType.includes(e1.type)
		}
		return false;
	}).map(m => m.id)

	return match;
}

World.prototype.getAllEntities = function() {
	return Object.keys(this.entDirectory).map(key => this.entDirectory[key])
}

World.prototype.constructFacts = function() {
	// Remove everything we know from the world
	let f = []
	$.each(this.entDirectory, (id, ent) => f = f.concat(ent.constructFacts()))
	return f;
}

World.prototype.clearFacts = function() {
	// Remove everything we know from the world
	$.each(this.entDirectory, (id, ent) => ent.clearFacts())

}

World.prototype.createRandomFacts = function(pct) {
	let facts = []

	$.each(this.entDirectory, (id, ent) => {
		// What kind of fact can we create for this?

		// For each class of facts (relationships, props, etc)
		// Create facts for that class (for this entity type)

		factClasses.forEach((fc) => {
			let factTypes = this.type.getMatchingFactTypes(fc, ent.type)
			factTypes.forEach(ft => {
				switch (ft.factClass) {
					case "relationship":

						let targetType = getRandom(ft.targetType)
						let targetOptions = this.getAllEntities().filter(ent => ent.type === targetType)
						if (!ft.allowSelfTargeting)
							targetOptions = targetOptions.filter(ent0 => ent !== ent0)
						let target = getRandom(targetOptions);

						// create relationship
						if (Math.random() > 1 - pct || ft.isRequired) {

							facts.push({
								key: ft.id,
								params: [ent.id, target.id],
								not: Math.random() > .5
							})
						}
						break;
					case "tempRelationship":
						for (var i = 0; i < timeCount; i++) {
							let targetType = getRandom(ft.targetType)
							let targetOptions = this.getAllEntities().filter(ent => ent.type === targetType)
							if (!ft.allowSelfTargeting)
								targetOptions = targetOptions.filter(ent0 => ent !== ent0)
							let target = getRandom(targetOptions);

							// create relationship
							if (Math.random() > 1 - pct || ft.isRequired) {

								facts.push({
									key: ft.id,
									params: [ent.id, target.id, i],
									not: Math.random() > .5
								})
							}
						}
						break;
					case "property":
						if (Math.random() > 1 - pct || ft.isRequired) {

							facts.push({
								key: ft.id,
								params: [ent.id, getRandom(ft.options)]
							})
						}
						break;
					case "condition":
						// for (var i = 0; i < timeCount; i++) {
						// 	if (Math.random() > 1 - pct || ft.isRequired) {
						// 		facts.push({
						// 			key: ft.id,
						// 			params: [ent.id, Math.random() > .5, i]
						// 		})
						// 	}
						// }
						break;
					default:
						console.warn("Unknown fact type: " + ft.factClass)
				}
			})
		});
	})


	this.gainFacts(facts);
}
World.prototype.refreshFacts = function() {
	let facts = this.constructFacts();
	solverView.setKnownFacts(facts);

}
World.prototype.solve = function() {
	// Compile and solve
	let facts = this.constructFacts();
	
	solverView.setKnownFacts(facts);
	solverView.setRules(this.type.rules);
	solverView.setStatus("solving...")

	groundAndSolve(this.type.rules, facts, (factsets) => {
		solverView.setStatus("solved: " + factsets.length + " soln sets")
		solverView.showFactSets(factsets);

	});
}

World.prototype.getEntStyle = function(id, pastelMod) {
	let hue = (id.hashCode() * .1213) % 1
	let pastel = Math.sin(id.hashCode() * 2.3913) * .1
	if (pastelMod)
		pastel += pastelMod
	let color = new KColor(hue, 1, 1)

	return {
		backgroundColor: color.toCSS(pastel + .4),
		color: color.toCSS(pastel - .8)
	}

}

World.prototype.getEnt = function(id) {
	// Get the entity for this id
	if (this.entDirectory[id])
		return this.entDirectory[id]
	// console.warn("No entity found for id:'" + id + "'")
}

World.prototype.getFactType = function(key) {
	// if (this.type.factTypeDirectory[key] === undefined)
	// 	console.warn("No fact type for:" + key)
	return this.type.factTypeDirectory[key]
}

World.prototype.gainFacts = function(facts) {
	// Distribute these facts
	facts.forEach(f => {
		let ownerID = f.params[0]
		this.getEnt(ownerID).gainFact(f)
	})
}

World.prototype.on = addEventHandler;
World.prototype.do = doEventHandlers;
World.prototype.removeEventHandlers = removeEventHandlers;