function randomSeed() {
	let s = "";

	for (var i = 0; i < 10; i++) {
		s += String.fromCharCode(Math.floor(Math.random() * 64) + 48);
	}
	return s;
}

function TraceryView(holder) {
	let main = createSection(holder, {})

	this.origin = $("<input>").appendTo(main.title).keyup(() => this.generate())


	this.type = $("<select/>", {
		html: "<option>text</option><option>svg</option>"
	}).appendTo(main.title)
	this.origin.val("#origin#")


	this.count = $("<select/>", {
		html: "<option>1</option><option>6</option><option>24</option><option>64</option>"
	}).appendTo(main.title).change(() => this.generate())
	this.origin.val("#origin#")
	this.count.val("6")



	this.colorMode = new ToggleButton(main.controls, {
		buttonLabel: "🎨",
		classes: "tracery-controlbutton",
		onChange: (val) => {
			this.generate();
			editor.setColorMode()
		}
	})

	this.outputView = main.main

	let buttonSettings = {

		"back": {
			img: "⏪",
			fxn: () => {
				this.seedIndex = Math.max(0, this.seedIndex - 1);
				this.seed.val(this.seeds[this.seedIndex])
				this.generate();
			}
		},
		"forward": {
			img: "⏩",
			fxn: () => {
				this.seedIndex++;

				if (this.seedIndex >= this.seeds.length) {



					this.seeds[this.seedIndex] = randomSeed();
				} else {

				}
				this.seed.val(this.seeds[this.seedIndex])
				this.generate();
			}
		},

		"random": {
			img: "🎲",
			fxn: () => {
				this.addSeed(randomSeed())
			}
		},



	}


	this.buttons = mapObject(buttonSettings, button => {
		return $("<button/>", {
			html: button.img,
			class: "tracery-controlbutton"
		}).appendTo(main.controls).click(button.fxn)
	})


	this.seeds = []
	this.seedIndex = -1;
	main.controls.append("seed:")
	this.seed = $("<input>").appendTo(main.controls)
	this.addSeed("~sOme pHrAsE~")

	this.generate();
	this.colorMode.setTo(true)

}


TraceryView.prototype.generate = function() {
	let seed = this.seed.val()
	Math.seedrandom(seed);
	tracery.setRng(Math.random);


	let raw = editor.constructGrammar()
	let grammar = tracery.createGrammar(raw)

	grammar.addModifiers(baseEngModifiers)
	this.outputView.html("")

	let count = parseInt(this.count.val())
	for (var i = 0; i < count; i++) {
		let s = grammar.flatten(this.origin.val())


		if (this.colorMode.state) {
			let chip = $("<div/>", {
				class: "tracery-output"
			}).appendTo(this.outputView);
			let node = grammar.expand(this.origin.val())
			createNodeView(chip, node, )
		} else {
			let chip = $("<div/>", {
				html: s,
				class: "tracery-output tracery-output-" + this.type.val()
			}).appendTo(this.outputView);
		}
	}

}

function createNodeView(holder, node) {

	let div = $("<div/>", {
		class: "tracery-diagram-node"
	}).appendTo(holder)

	if (node.type === 0) {
		div.addClass("tracery-diagram-text")
		div.html(node.raw);
	} else {
		if (node.type === 1) {

			let sv = editor.getSymbolView(node.symbol);
			if (sv) {
				div.css({
					backgroundColor: sv.idColor.toCSS(.2)
				})
			}
			div.click(() => {

				editor.selectSymbol(node.symbol, node.childRule, true)
				return false;
			})
		}

		let header = $("<div/>", {
			class: "tracery-diagram-header",
			html: node.raw
		}).appendTo(div);

		let content = $("<div/>", {
			class: "tracery-diagram-content"
		}).appendTo(div);

		if (node.children) {
			let children = node.children.map(c => createNodeView(content, c))
		}
	}
}

TraceryView.prototype.getColorMode = function() {
	return this.colorMode.state;
}
TraceryView.prototype.addSeed = function(v, incrementSeed) {
	this.seedIndex++;

	this.seed.val(v)
	this.seeds[this.seedIndex] = v;
	this.generate()
}