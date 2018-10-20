// Maintain the view for the world
function WorldView(holder, world) {
	console.log("CREATE VIEW")
	world.on("update", this, () => {

	})
	world.on("addCharacter", this, () => {

	})
	world.on("removeCharacter", this, () => {

	})

	this.section = createSection(holder, {
		title: "world",
		classes: "mh-worldview",
	})


	this.characterHolder = createSection(this.section.main, {
		title: "characters",
		classes: "mh-characters",
	})



	// Create all existing characters 
	world.characters.forEach((c) => {
		let cv = new CharacterView(this.characterHolder.main);
		cv.setCharacter(c);
	})
}



// Maintain the view for the character
function CharacterView(holder) {
	this.section = createSection(holder, {
		title: "character",
		classes: "mh-characterview",
	})

	// Create a table of all the values
	this.table = createEditableTable(this.section.main, {
		rows: characterTraits,
		onChange: (key, v, lastV) => {
			console.log(key + ":" + lastV + " -> " + v)
			this.character[key] = v;
		}
	})
}

CharacterView.prototype.setCharacter = function(character) {
	// Remove handlers
	if (this.character !== undefined)
		this.character.removeHandlers(this)

	this.character = character;

	// Add handlers
	this.character.on("update", this, (key, v, lastV) => {
		// Refresh the view
		console.log("values changed for " + character + ":" + key + " [" + lastV + " -> " + v + "]")
		this.table.rows[key].value.html(character[key])
		this.table.rows[key].editorInput.val(character[key])
	})

	$.each(characterTraits, (key, obj) => {
		this.table.rows[key].value.html(character[key])
		this.table.rows[key].editorInput.val(character[key])
	})


}