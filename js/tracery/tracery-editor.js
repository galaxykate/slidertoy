let userGrammarPrefix = "usergrammar_"

function TraceryEditor(holder) {
	let main = createSection(holder, {
		title: "title: "
	})



	this.grammarTitle = $("<span>", {
		class: "tracery-grammartitle",
		html: "testGrammar",
		contentEditable: true
	}).appendTo(main.title)

	this.symbolMain = createSection(main.main, {
	
	})

	let buttonData = [{
		label: "💾",
		fxn: () => {
			let id = this.grammarTitle.text();
			console.log("Save " + id)

			let data = {
				grammar: this.constructGrammar(),
				modified: (new Date()).toLocaleString()
			}
			let json = JSON.stringify(data, null, 2);
			localStorage.setItem(userGrammarPrefix + id, json);
			this.resetGrammarOptions()
		}
	}, {
		label: "🔽",
		fxn: () => {
			console.log("DOWNLOAD")
			let grammar = this.constructGrammar();
			let json = JSON.stringify(grammar, null, 2);
			downloadTextAsFile(this.grammarTitle.text(), json)
		}
	}, {
		label: "🕳",
		fxn: () => {
			localStorage.clear();
			var answer = confirm('Do you want to clear all saved grammars?');
			if (answer)
				this.resetGrammarOptions()
		}
	}]

	buttonData.forEach(button => {
		$("<button/>", {
			html: button.label,
			class: "tracery-controlbutton"
		}).appendTo(main.controls).click(button.fxn)
	})

	this.grammarSelect = $("<select/>", {
		html: getGrammarSelectOptions()
	}).appendTo(main.controls).change(() => {
		let val = this.grammarSelect.val()
		console.log("Selected: " + val)
		this.loadByID(val)
	})


	//========================================================
	// Symbol editor


	let symbolcontrols = this.symbolMain.controls

	this.symbolSearchKeyOnly = false;

	this.toggleSortable = new ToggleButton(symbolcontrols, {
		buttonLabel: "💞",
		classes: "tracery-controlbutton",
		onChange: (val) => {
			if (val) {
				$(".tracery-symbol-rules").sortable("enable");
				this.symbolHolder.sortable("enable");
			} else {
				this.symbolHolder.sortable("disable");
				$(".tracery-symbol-rules").sortable("disable");
			}

		}
	})

	this.addSymbol = $("<button/>", {
		html: "➕",
		class: "tracery-controlbutton",
	}).appendTo(symbolcontrols).click(() => {
		let sv = new TracerySymbolEditor(this.symbolHolder, this)
		sv.setToSymbol(this.getUniqueID(), [""])
		this.symbolViews.push(sv)
	})

	symbolcontrols.append(" search:")

	this.searchValue = $("<input/>").appendTo(symbolcontrols).keyup(() => {
		let val = this.searchValue.val()

		this.symbolViews.forEach((sv) => {
			let found = false
			if (this.symbolSearchKeyOnly) {
				found = sv.key.indexOf(val) >= 0
			} else {
				let f = ([sv.key].concat(sv.rules)).filter(s => s.indexOf(val) >= 0)
				if (f.length == 0)
					sv.hide()
				else
					sv.show()
			}
		})
	});
	this.toggleSeach = new ToggleButton(symbolcontrols, {
		buttonLabel: "🔑",
		default: this.symbolSearchKeyOnly,
		classes: "tracery-controlbutton",
		onChange: (val) => {
			this.symbolSearchKeyOnly = val;
			this.symbolViews.forEach(sv => {
				let hide = true;
				if (this.symbolSearchKeyOnly) {
					hide = sv.key.indexOf(val);
				}
			})
		}
	})


	this.symbolHolder = $("<div/>", {
		class: "tracery-symbols",
	}).appendTo(this.symbolMain.main).sortable({
		change: () => {
			console.log("change")
			let ids = this.symbolHolder.sortable("toArray");
			console.log(ids)
		}
	}).sortable("disable")

	this.symbolViews = [];

	//===================

	this.loadByID("tg_basic")

}
TraceryEditor.prototype.resetGrammarOptions = function() {
	this.grammarSelect.html(getGrammarSelectOptions())
}
TraceryEditor.prototype.constructGrammar = function() {
	let grammar = {}
	for (var i = 0; i < this.symbolViews.length; i++) {
		let sv = this.symbolViews[i]

		grammar[sv.key] = sv.rules
	}
	return grammar
}

TraceryEditor.prototype.loadByID = function(val) {
	// set the menu
	console.log("load: " + val)
	this.grammarSelect.val(val)

	let i = val.indexOf("_")
	let prefix = val.substring(0, i);
	let id = val.substring(i + 1);
	// Test grammar
	if (prefix === "tg") {
		this.loadGrammar(testGrammars[id], id)
	} else {
		let data = localStorage.getItem(userGrammarPrefix + id);
		if (data !== null)
			data = JSON.parse(data);
		this.loadGrammar(data.grammar, id)
	}
}


TraceryEditor.prototype.getUniqueID = function(id) {
	if (id === undefined)
		id = "symbolname"

	let idNumber = 0;
	let key = id + idNumber;
	while (this.symbolViews.filter(s => s.key === key).length > 0) {
		idNumber++;
		key = id + idNumber;
	}
	return key
}

TraceryEditor.prototype.setColorMode = function() {
	$.each(this.symbolViews, (index, sv) => sv.setColorMode())
}

TraceryEditor.prototype.loadGrammar = function(rawGrammar, id) {
	this.grammarTitle.html(id)
	// Shallowish-clone the grammar
	this.grammar = mapObject(rawGrammar, (rules, key) => rules.slice())
	console.log(this.grammar)

	let keys = Object.keys(rawGrammar);

	while (this.symbolViews.length > keys.length) {
		this.symbolViews[this.symbolViews.length - 1].remove();
		this.symbolViews.pop();
	}

	while (this.symbolViews.length < keys.length) {
		this.symbolViews.push(new TracerySymbolEditor(this.symbolHolder, this))
	}

	for (var i = 0; i < this.symbolViews.length; i++) {
		let key = keys[i]
		this.symbolViews[i].setToSymbol(key, rawGrammar[key])
	}

	if (view)
		view.generate();

}

TraceryEditor.prototype.getSymbolView = function(key) {
	let sv = this.symbolViews.filter((sv) => sv.key === key)[0]
	return sv;
}

TraceryEditor.prototype.selectSymbol = function(key, rule, scrollto) {
	console.log(key, rule)


	let sv = this.getSymbolView(key)
	if (!sv)
		console.warn("no view for: " + key)
	sv.select();

	if (rule) {
		sv.selectRule(rule);
	}

	if (scrollto) {
		var top = sv.row.offset().top + this.symbolMain.main.scrollTop();
		console.log(top)
		top -= 100;

		this.symbolMain.main.animate({
			scrollTop: top
		}, 200);
	}
	return sv;
}

TraceryEditor.prototype.onChangeKey = function(key, lastKey) {
	console.log("key change: " + lastKey + " -> " + key);


	view.generate();
}


TraceryEditor.prototype.onSymbolChange = function(key, rules) {
	console.log("symbol change: " + key, rules);

	view.generate();
}

let tracerySymbolEditorCount = 0;

function TracerySymbolEditor(holder, grammarEditor) {

	this.grammarEditor = grammarEditor;
	this.idNumber = tracerySymbolEditorCount++;
	this.idColor = new KColor((this.idNumber * .214 + .7) % 1, 1, 1)

	this.row = $("<div>", {
		class: "tracery-symbol-row",

	}).appendTo(holder).click(() => {
		if (this.grammarEditor.selectedSymbol === this) {
			//this.deselect();
		} else {
			this.select();
		}
	})

	this.header = $("<div>", {
		class: "tracery-symbol-header",
	}).appendTo(this.row)

	this.label = $("<div>", {
		class: "tracery-symbol-label",
		html: "key",
		contentEditable: true,
	}).appendTo(this.header).keyup(() => {
		this.key = this.label.html();
		this.grammarEditor.onChangeKey(this.key, this.lastKey)
		this.lastKey = this.key;
		this.setID();

	})

	this.controls = $("<div>", {
		class: "tracery-symbol-controls",
	}).appendTo(this.header).hide();

	let buttonSettings = {
		"deleteSymbol": {
			img: "🗑",
			fxn: () => {
				// TODO remove this from the grammar
				this.grammarEditor.remove(this.key)
				this.remove();
			}
		},
		"cloneSymbol": {
			img: "👯‍♂️",
			fxn: () => {
				let clone = this.grammarEditor.addSymbolBelow(this)
				clone.setTo(this.grammarEditor.getUniqueID(key), this.rules.slice(0))
			}
		},
		"clear": {
			img: "✨",
			fxn: () => {
				this.ruleHolder.html("");
				this.ruleChips = [];
				this.rules = []
				this.grammarEditor.onSymbolChange(this.key, this.rules)
			}

		},


	}



	this.buttons = mapObject(buttonSettings, button => {
		return $("<button/>", {
			html: button.img,
			class: "tracery-controlbutton"
		}).appendTo(this.controls).click(() => button.fxn())
	})



	this.ruleHolder = $("<span>", {
		class: "tracery-symbol-rules"
	}).appendTo(this.row).sortable({
		change: () => {
			console.log("sorted")
		}
	}).sortable("disable")

	this.addRule = $("<button/>", {
		class: "tracery-controlbutton", 
		html: "➕"
	}).appendTo(this.row).click(() => {
		this.rules.push("")
		
		this.ruleChips.push(new TraceryRuleChip(this, ""))
		this.grammarEditor.onSymbolChange(this.key, this.rules);
	})

	this.setColorMode();
}

TracerySymbolEditor.prototype.setColorMode = function() {
	if (view) {
		console.log("CHANGE COLOR MODE")
		mode = view.getColorMode()
		if (mode) {
			this.row.css({
				backgroundColor: this.idColor.toCSS(.4)
			})
			this.label.css({
				backgroundColor: this.idColor.toCSS(.4)
			})
		} else {
			this.row.css({
				backgroundColor: "hsla(0,0%,90%, .4)"
			})
			this.label.css({
				backgroundColor: "hsla(0,0%,90%, .4)"
			})
		}
	}
}

TracerySymbolEditor.prototype.hide = function() {
	this.row.slideUp(100)
}
TracerySymbolEditor.prototype.show = function() {
	this.row.slideDown(100)
}

TracerySymbolEditor.prototype.selectRule = function(s) {
	$(".tracery-rulechip").removeClass("selected")
	let chips = this.ruleChips.filter(chip => chip.lastValue === s);
	chips.forEach(c => c.chip.addClass("selected"))

}

TracerySymbolEditor.prototype.select = function() {
	if (this.grammarEditor.selectedSymbol)
		this.grammarEditor.selectedSymbol.deselect();
	this.grammarEditor.selectedSymbol = this;

	this.row.addClass("selected");
	this.controls.slideDown(100);
}

TracerySymbolEditor.prototype.deselect = function() {
	this.grammarEditor.selectedSymbol = undefined;

	this.row.removeClass("selected");
	this.controls.slideUp(100);

}
TracerySymbolEditor.prototype.setID = function() {
	let key = "-" + this.key;
	if (!this.key)
		key = ""
	this.row.attr('id', "symbol" + this.idNumber + key);
}
TracerySymbolEditor.prototype.remove = function(key, rules) {
	this.row.remove();

}
TracerySymbolEditor.prototype.setToSymbol = function(key, rules) {
	this.key = key;

	this.setID();

	this.label.html(key);
	this.ruleHolder.html("");
	this.rules = rules.slice(0)

	if (typeof rules === "string")
		rules = [rules]

	this.ruleChips = rules.map((rule, index) => {
		let chip = new TraceryRuleChip(this, rule)
		return chip;
	})


}


function TraceryRuleChip(symbolEditor, rule) {
	this.symbolEditor = symbolEditor;

	this.chip = $("<div/>", {
		contentEditable: true,
		class: "tracery-rulechip"
	}).appendTo(symbolEditor.ruleHolder).keydown((ev) => {

		if (ev.which === 9) {
			let index = this.getIndex();
			console.log(index)
			if (index < symbolEditor.ruleChips.length) {
				console.log(index)
				symbolEditor.ruleChips[index].chip.focus();
			}
		}
	}).keyup((ev) => {
		this.update()


	}).keydown((ev) => {
		console.log(ev.which)
		console.log(this.lastValue)
		if (ev.which === 8 && this.lastValue.length === 0)
			this.remove()
	});
	this.chip.text(rule)
	this.lastValue = rule;
}


TraceryRuleChip.prototype.remove = function() {
	let index = this.getIndex()
	let pre = this.symbolEditor.rules.slice(0, index)
	let post = this.symbolEditor.rules.slice(index + 1);
	this.symbolEditor.rules = pre.concat(post)
	this.symbolEditor.grammarEditor.onSymbolChange(this.symbolEditor.key, this.symbolEditor.rules);
	this.chip.remove()
	
}
TraceryRuleChip.prototype.getIndex = function() {
	let index = this.symbolEditor.ruleChips.indexOf(this);
	return index;
}

TraceryRuleChip.prototype.setToRule = function(rule) {
	this.chip.text(rule)
	this.lastValue = rule;
}
TraceryRuleChip.prototype.update = function() {
	let index = this.getIndex();
	let v = this.chip.text();
	this.symbolEditor.rules[this.getIndex()] = v;
	this.symbolEditor.grammarEditor.onSymbolChange(this.symbolEditor.key, this.symbolEditor.rules);
	this.lastValue = v;
}



function getLocalGrammarsByDate() {
	let grammars = []
	for (var key in localStorage) {
		if (key.startsWith(userGrammarPrefix)) {
			let id = key.substring(userGrammarPrefix.length)
			let date = new Date(JSON.parse(localStorage.getItem(key)).modified)
			grammars.push({
				id: id,
				date: date
			})
		}
	}

	grammars = grammars.sort((a, b) => b.date - a.date)

	return grammars;
}

function getGrammarSelectOptions() {

	let options = []
	// localstore grammars

	let grammarsByDate = getLocalGrammarsByDate();
	options = options.concat(grammarsByDate.map(data => {
		return {
			label: data.id + " " + data.date.toLocaleString(),
			id: "ls_" + data.id
		}
	}))

	options = options.concat(Object.keys(testGrammars).map(key => {
		return {
			label: key + "*",
			id: "tg_" + key
		}

	}))



	return options.map(data => "<option value='" + data.id + "'>" + data.label + "</option>");
}