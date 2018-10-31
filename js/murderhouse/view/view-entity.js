var Emoji = Object.freeze({
	"undefined": "□",
	"false": "🔲",
	"true": "⬛️"
})

let icons = {
	"object": "sphere",
	"character": "meeple",
	"room": "house",

}

// Maintain the view for the world
function EntView(holder, world, ent) {
	this.world = world;
	this.ent = ent;

	this.row = createRow(holder, {
		
	})


	let img  = $("<img/>", {
		class: "icon",
		src: "img/" + icons[ent.type] + ".svg",
	}).appendTo(this.row.label)

	this.row.label.css(world.getEntStyle(ent.id))
	this.row.label.click(() => {
		globalSelect(this.row, ent)
	}) 

	img.find("path").attr("fill", "red")
	this.row.label.append(ent.id)

	ent.properties.on("changeValue", this, (key, value, v0) => {})
	ent.relationships.on("changeValue", this, (key, value, v0) => {

	})

	this.relationshipsView = new FactView(this.row.main, this, ent.relationships)
	this.propertyView = new FactView(this.row.main, this, ent.properties)

	this.timelineView = new EntTimelineView()

}


function FactView(holder, entView, set) {
	this.set = set;
	this.holder = $("<div/>", {
		class: "mh-setview mh-" + set.type
	}).appendTo(holder)

	this.values = mapObject(set.values, (val, key) => {

		// Make the label and holder
		let data = createLabelData(this.holder, {
			label: key
		})

		// Create the input device
		switch (set.type) {
			case "relationshipSet":

				let options = entView.world.getTargetOptionsFor(entView.ent, key)
				data.chips = {}

				options.forEach(targetID => {

					// Create the chip
					data.chips[targetID] = $("<div/>", {
						class: "mh-booleanbutton",
						html: targetID
					}).appendTo(data.value).css(entView.world.getEntStyle(targetID)).click(() => {
						set.toggleRelValue(key, targetID)
					})

				})


				break;
			case "propertySet":

				// Create the dropdown toggle
				data.valueShow = $("<div/>", {
					html: "-",
					class: "mh-property-value"
				}).appendTo(data.value)

				data.selectMenu = $("<select/>", {
					class: "mh-property-select",
					html: "<option>-</option>" + val.options.map(s => "<option>" + s + "</option>")
				}).appendTo(data.value).click(() => {
					return false
				}).change(() => {
					// deselect
					globalSelect(data)
					set.setValue(key, data.selectMenu.val())
				})

				data.click(() => {
					
					globalSelect(data)
				})

				break;
			default:
				console.warn("Unknown set type:", set.type)
		}
		return data

	})


	// Set the update handlers
	set.on("changeRelValue", this, (key, targetID, val, v0) => {

		this.updateRelValue(key, targetID)
	})

	set.on("changeValue", this, (key, val, v0) => {
		this.updateValue(key, val)
	})


	// Initialize
	$.each(set.values, (key, data) => {

		switch (set.type) {
			case "relationshipSet":
				$.each(data, (targetID) => this.updateRelValue(key, targetID))
				break;
			default:
				$.each(data, (targetID) => this.updateValue(key, targetID))
				break;
		}
	})
}

// Update to this value
FactView.prototype.updateValue = function(key) {
	

	let val = this.set.getValue(key)
	
	if (this.set.type === "propertySet") {
		let obj = this.values[key]
		obj.selectMenu.val(val)
		obj.valueShow.html(val)
	} else {
		// Condition
	}

}

FactView.prototype.updateRelValue = function(key, targetID) {
	let chip = this.values[key].chips[targetID]
	if (chip) {
		let val = this.set.getRelValue(key, targetID)
		chip.removeClass("mh-booleanbutton-true")
		chip.removeClass("mh-booleanbutton-false")

		if (val == true) {
			chip.addClass("mh-booleanbutton-true")
		}
		if (val == false) {
			chip.addClass("mh-booleanbutton-false")
		}
	}

}