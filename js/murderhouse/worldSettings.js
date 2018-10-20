
// c: character
// r: room
// t: time
let relationshipTypes = {
	isSiblingOf: {
		params: "cc"
	},
	isParentOf: {
		params: "cc"
	},
	isChildOf: {
		params: "cc"
	},
	isInLoveWith: {
		params: "cc"
	},
	isJealousOf: {
		params: "cc"
	},
	hates: {
		params: "cc"
	},
	loveTriangle: {
		params: "ccc"
	},
	isIn: {
		params: "crt"
	},
	canSee: {
		params: "rr"
	},
	connectedTo: {
		params: "rr"
	},
	isDead: {
		params: "ct"
	}
}

let characterTraits = {
	name: {
		type: "string",
	},
	gender: {
		type: "select",
		options: ["m", "f", "n"],
		asp: true,
	},
	wealth: {
		type: "select",
		options: ["poor", "rich"],
		asp: true,
	},
	age: {
		type: "int",
		min: 0,
		max: 2,
		asp: true,
	}
}

function getIDColor(r) {
	if (characterTraits[r])
		return characterTraits[r].idColor
	if (relationshipTypes[r])
		return relationshipTypes[r].idColor
	console.warn("No relationship or trait:", r)
	return new KColor(1, 0, .4)
}

let charTraitNumber = 0;
$.each(characterTraits, (key, obj) => {
	obj.idNumber = charTraitNumber++;
	obj.idColor = new KColor((obj.idNumber*1.38)%1, .5, .5);
})
let rTraitNumber = 0;
$.each(relationshipTypes, (key, obj) => {
	obj.idNumber = rTraitNumber++;
	obj.idColor = new KColor((obj.idNumber*1.38 + .3)%1, .5, .5);
})

