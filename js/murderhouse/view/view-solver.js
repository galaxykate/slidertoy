function SolverView(holder, world) {
	this.world = world;



	this.givenFacts = createSection(holder, {
		title: "Known Facts",
		classes: "mh-section",
	})

	this.solutions = createSection(holder, {
		title: "Solutions",
		classes: "mh-section",
	})


	this.status = this.solutions.controls

	this.solutionHolder = $("<div/>").appendTo(this.solutions.main)
	this.factHolder = $("<div/>").appendTo(this.givenFacts.main)
	this.ruleHolder = $("<pre/>").appendTo(this.givenFacts.main)
}


SolverView.prototype.showFactSets = function(sets) {
	this.solutionHolder.html("")
	sets.forEach((set, index) => {
		let section = createSection(this.solutionHolder, {
			title: "Solution " + index,
			classes: "mh-section",
		})
		let factHolder = $("<div/>").appendTo(section.main)

		this.appendFacts(factHolder, set)
	})
}
SolverView.prototype.setStatus = function(statusMsg) {
	this.status.html(statusMsg)
}
SolverView.prototype.setRules = function(rules) {
	console.log(rules)
	this.ruleHolder.html(rules)
}
SolverView.prototype.appendFacts = function(holder, facts) {

	facts.forEach(f => {

		let ft = this.world.getFactType(f.key)

		let chip = $("<div/>", {
			class: "mh-fact",
			html: "",
		}).appendTo(holder)
		if (ft) {
			chip.css(this.world.getEntStyle(ft.factClass, .5))
		}

		if (f.not) {
			let negation = $("<div/>", {
				class: "mh-fact-negate",
				html: "-",
			}).appendTo(chip)
		}

		let label = $("<div/>", {
			class: "mh-fact-label",
			html: f.key,
		}).appendTo(chip)



		let params = $("<div/>", {
			class: "mh-fact-paramholder",
		}).appendTo(chip)

		f.params.forEach(p => {
			let ent = this.world.getEnt(p)

			let param = $("<div/>", {
				html: p,
				class: "mh-fact-param",
			}).appendTo(params)

			if (ent)
				param.css(this.world.getEntStyle(p))
			else
				param.addClass("mh-fact-paramvalue")
		})

	})
}

SolverView.prototype.setKnownFacts = function(facts) {
	this.factHolder.html("")
	this.appendFacts(this.factHolder, facts.map(f => parseFact(f)))
}


SolverView.prototype.showSolutions = function(factsets) {



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
			this.world.gainFacts(set);
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