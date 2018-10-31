let timeCount = 10;
let worldSettings = {
	count: {
		object: 5,
		room: 3,
		character: 4
	},


	rules:  `
		
		% some timesteps?
		t(1..10).

		% some number of people are dead at the end
		1 {dead(X, 10):character(X)} 1.

		% some number of people are in love
		1 {inLoveWith(X, Y):character(X), character(Y), X!=Y} 3.
		loveTriangle(X,Y,Z) :- inLoveWith(X, Y),inLoveWith(Y, Z), X!=Z.
		hates(X,Y) :- loveTriangle(X,_,Y).

		inRoom(X,R) : room(R) :- character(X).

		:- inLoveWith(X,Y),X=Y.

		% test color rule
		% { color(X,1..5) } = 1 :- character(X).

		%
		siblingOf(X, Y) :- siblingOf(Y, X).
		childOf(X, Y) :- parentOf(Y, X).
		parentOf(X, Y) :- childOf(Y, X).

		motive(X,Y) :- hates(X, Y). 
		victim(X) :- dead(X, 10).

		sharingRoom(X,Y) :- X!=Y, inRoom(X,R), inRoom(Y,R).

		% witness(X,Y,Z) :- sharingRoom(X,Z),  sharingRoom(X,Y),  Y!=Z.

		%1 {dead(X, 10):character(X)} 1.
		0 {opportunity(X, Y) :character(X) ,character(Y),sharingRoom(X,Y)} 10.


		%opportunity(X,Y) :- psychicKiller(X),character(Y).
		%1 {psychicKiller(X):character(X)} 3.

		% generate some number
		suspect(X,Y) :- motive(X,Y), opportunity(X,Y), victim(Y).
		:- not 2 {suspect(X,Y):character(X),character(Y)} 3.

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
			room: ["canSee", "connectedTo"],
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