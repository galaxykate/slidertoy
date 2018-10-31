let timeCount = 10;
let worldSettings = {
	count: {
		object: 5,
		room: 5,
		character: 5
	},


	rules:  `
		
		% some timesteps?
		t(1..10).

		% some number of people are dead at the end
		1 {dead(X, 10):character(X)} 3.

		% some number of people are in love
		1 {inLoveWith(X, Y):character(X), character(Y), X!=Y} 3.
		loveTriangle(X,Y,Z) :- inLoveWith(X, Y),inLoveWith(Y, Z).
		hates(X,Y) :- loveTriangle(X,_,Y).

		% test color rule
		{ color(X,1..5) } = 1 :- character(X).

		%
		siblingOf(X, Y) :- siblingOf(Y, X).
		childOf(X, Y) :- parentOf(Y, X).
		parentOf(X, Y) :- childOf(Y, X).
		`,

	// What someone/something is, always
	// Can also have "pretending" overlays?
	properties: {
		// Character properties
		character: {
			gender: ["m", "f", "n"],
			morality: ["evil", "neutral", "good"],
			wealth: [0, 1, 2],
			isNobility: ["true", "false"]
		},

		room: {
			carpeted: ["true", "false"],
			indoor: ["true", "false"],
		},

		obj: {
			size: ["small", "medium", "large"],
		}
	},

	// What someone/something can be at some time 
	// True/false
	conditions: {
		character: ["sick", "dead", "asleep"],
		room: ["lit"],
		co: ["hidden"],
		all: ["onFire"]
	},

	relationships: {
		character: {
			character: ["inLoveWith", "parentOf", "siblingOf", "businessRivalOf"],
		},
		room: {
			room: ["canSee"],
		},
		object: {
			character: ["ownedBy*"]
		}
	},

	tempRelationships: {
		character: {
			room: ["inRoom*"]
		},

		object: {
			co: ["heldBy*"],
			character: ["desiredBy"]
		},
		
	}
}