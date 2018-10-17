$(function() {

	let world = new World();

	console.log("Ready")

	let code = `% instance
motive(harry).
motive(sally).
guilty(harry).

% encoding
innocent(Suspect) :- motive(Suspect), not guilty(Suspect).
`

	let rules = `
% { married(X,Y) :person(X) :person(Y) }.
{ color(X,1..5) } = 1 :- person(X).
isSiblingOf(X, Y) :- isSiblingOf(Y, X).
	`

	
	
	groundAndSolve(rules, world.getFacts(), (newFacts) => {
		console.log(newFacts[0])
	})
})