let entCount = {};


function Entity(world, type) {
	this.idNumber = entCount[type]++;

	this.world = world;
	this.id = type.substring(0, 1) + this.idNumber

	this.type = type;
	this.relationships = new RelationshipSet(this, world.type.getMatchingFactTypes("relationship", type))

	// types of information an entity has
	// properties: things with more than one option (but only pick one)
	// conditions: 

	this.properties = new PropertySet(this, world.type.getMatchingFactTypes("property", type) );
	this.timeline = []
	for (var i = 0; i < timeCount; i++) {
		this.timeline[i] = {
			t: i,
			conditions: new ConditionSet(this, world.type.getMatchingFactTypes("condition", type)),
			relationships: new RelationshipSet(this, world.type.getMatchingFactTypes("tempRelationship", type))
		}
	}
}

// Make some nice facts for ASP (from all the various fact sets)
Entity.prototype.constructFacts = function() {
	let facts = [fact(this.type, this.id)]
	facts= facts.concat(this.properties.constructFacts(this.id))
	facts= facts.concat(this.relationships.constructFacts(this.id))
	return facts;
}

Entity.prototype.gainFact = function(fact) {
	// What kind of fact is this?
	let factType = this.world.getFactType(fact.key)

	let t = fact.params[fact.params.length - 1]

	switch (factType.factClass) {
		case "relationship":
			this.relationships.setToRel(fact.key, fact.params[1], !fact.not);
			break;
		case "temprelationship":
			//this.timeline[t].relationships.gainFact(fact);
			break;
		case "property":
			this.properties.setValue(fact.key, fact.params[1]);
			break;
	}
}



Entity.prototype.on = addEventHandler;
Entity.prototype.do = doEventHandlers;
Entity.prototype.removeEventHandlers = removeEventHandlers;