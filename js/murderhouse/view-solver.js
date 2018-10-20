function SolverView(holder, world) {
	this.world = world;

	this.section = createSection(holder, {
		title: "solutions",
		classes: "mh-solutions",
	})

	this.solutionHolder = $("<div/>", {

	}).appendTo(this.section.main)
}

SolverView.prototype.setFacts = function(factsets) {
	console.log(factsets)

	// clear
	this.solutionHolder.html("");
	factsets.map((set, index) => {
		let section = createSection(this.solutionHolder, {
			title: "solution" + index,
			classes: "mh-solutionset",
		})

		let use = $("<button/>", {
			html: "apply solution"
		}).appendTo(section.controls).click(() => {
			this.world.applyFacts(set);
		})

		section.main.css({
			display: "block"
		})

		$.each(set, (index, fact) => {
			let color = getIDColor(fact.r);
			let factDiv = $("<span/>", {
				class: "mh-fact",
				html: fact.r + " " + toTag("span", {
					class: "mh-factparams"
				}, fact.params.join(","))
			}).appendTo(section.main).css({
				backgroundColor: color.toCSS(.4),
				color: color.toCSS(-.4),
				
			})
		})
	})

}