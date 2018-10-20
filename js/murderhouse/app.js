$(function() {

	let world = new World();
	let worldView = new WorldView($("#section-editor .section-main"), world);
	let solverView = new SolverView($("#section-view .section-main"), world);

	console.log("Ready")

	let code = `% instance
motive(harry).
motive(sally).
guilty(harry).

% encoding
innocent(Suspect) :- motive(Suspect), not guilty(Suspect).
`

	let rules = `
	% some timesteps?
	t(1..10).
	
	% some number of people are dead at the end
	1 {dead(X, 10):person(X)} 3.
	
	% some number of people are in love
	1 {inLoveWith(X, Y):person(X), person(Y), X!=Y} 3.
	loveTriangle(X,Y,Z) :- inLoveWith(X, Y),inLoveWith(Y, Z).
	hates(X,Y) :- loveTriangle(X,_,Y).

	% test color rule
	{ color(X,1..5) } = 1 :- person(X).

	%
	isSiblingOf(X, Y) :- isSiblingOf(Y, X).
	isChildOf(X, Y) :- isParentOf(Y, X).
	isParentOf(X, Y) :- isChildOf(Y, X).
	`



	groundAndSolve(rules, world.getFacts(), (newFacts) => {
		
		solverView.setFacts(newFacts)
	})
})