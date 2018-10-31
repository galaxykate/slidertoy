function RelationshipSet(entity, factTypes) {
	this.entity = entity;
	this.type = "relationshipSet";
	this.values = {}

	factTypes.forEach(ft => {
		// Target ids
		this.values[ft.id] = {}
	})
}

RelationshipSet.prototype.setToRel = function(key, targetID, value) {
	// Does this relationship already exist with this target?
	if (this.values[key][targetID] !== value) {
		let v0 = this.values[key][targetID]
		this.values[key][targetID] = value
		this.do("changeRelValue", key, targetID, value, v0)
	}
}

RelationshipSet.prototype.getRelValue = function(key, targetID) {
	return this.values[key][targetID];
}

RelationshipSet.prototype.toggleRelValue = function(key, targetID) {
	console.log("Toggle: " + key, targetID)

	let v0 = this.values[key][targetID];
	if (v0 === false) {
		this.values[key][targetID] = true
	} else if (v0 === true) {
		this.values[key][targetID] = undefined
	} else {
		this.values[key][targetID] = false
	}
	console.log(" to: " + this.values[key][targetID])
	this.do("changeRelValue", key, targetID, this.values[key][targetID], v0)
}


// Create a list of facts for ASP
RelationshipSet.prototype.constructFacts = function(ownerID) {
	let facts = []
	

	$.each(this.values, (key, targetData) => {

		$.each(targetData, (targetID, value) => {
			if (value !== undefined) {
				let f = fact(key, ownerID, targetID)
				if (value === false) {
					console.log("NOT" + key + " " + ownerID + " " + targetID)
					f = "-" + f
				}
				facts.push(f)
			}
			
		})
	})
	return facts;
}


//=======================================================================
//=======================================================================

function PropertySet(entity, factTypes) {
	this.entity = entity;

	this.type = "propertySet";
	this.values = {}
	factTypes.forEach(ft => {
		this.values[ft.id] = {
			options: ft.options,
			index: -1,
			value: undefined
		}
	})
}


PropertySet.prototype.getValue = function(key) {
	return this.values[key].value;
}

PropertySet.prototype.setTo = function(key, index, options) {
	if (this.values[key].index !== index) {
		let v0 = this.values[key]
		this.values[key] = {
			index: index,
			options: options,
			value: options[index]
		}
		this.do("changeValue", key, this.values[key].value, v0)
	}
}

PropertySet.prototype.setValue = function(key, value) {

	let v = this.values[key]
	let v0 = v.value

	if (value == "-") {
		v.index = -1
		v.value = undefined
	} else {
		v.index = v.options.indexOf(value)
		v.value = value
	}


	this.do("changeValue", key, v.value, v0)
}

// Create a list of facts for ASP
PropertySet.prototype.constructFacts = function(ownerID) {
	let facts = []
	$.each(this.values, (key, value) => {
		if (value.value !== undefined)
			facts.push(fact(key, ownerID, value.value))
	})
	return facts;
}


//=======================================================================
//=======================================================================

function ConditionSet(entity, factTypes) {
	this.entity = entity;
	this.type = "conditionSet";
	this.values = {}
}

ConditionSet.prototype.setTo = function(key, value) {
	if (this.values[key] !== value) {
		let v0 = this.values[key]
		this.values[key] = value
		this.do("changeValue", key, value, v0)
	}
}

// Create a list of facts for ASP
ConditionSet.prototype.constructFacts = function() {
	let facts = []
	for (key in Object.keys(this.values)) {
		if (this.values[key] !== undefined)
			facts.push(fact(key, this, values[key]))
	}
}


//=======================================================================
//=======================================================================

RelationshipSet.prototype.on = addEventHandler;
RelationshipSet.prototype.do = doEventHandlers;
RelationshipSet.prototype.removeEventHandlers = removeEventHandlers;
ConditionSet.prototype.on = addEventHandler;
ConditionSet.prototype.do = doEventHandlers;
ConditionSet.prototype.removeEventHandlers = removeEventHandlers;
PropertySet.prototype.on = addEventHandler;
PropertySet.prototype.do = doEventHandlers;
PropertySet.prototype.removeEventHandlers = removeEventHandlers;