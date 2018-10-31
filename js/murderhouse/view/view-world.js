// Maintain the view for the world
function WorldView(holder, world) {

	$(document).click(function(event) {
		if (!$(event.target).closest('.mh-entprop').length) {
			if ($('.mh-entprop').is(":visible")) {
				$('.mh-entprop').removeClass("selected");
			}
		}
	});



	// Set handlers

	this.section = createSection(holder, {
		title: "world",
		classes: "mh-worldview",
	})

	let buttons = [{
		icon: "🕳",
		fxn: () => {
			world.clear()
		}
	}, {
		icon: "🎲",
		fxn: () => {
			world.createRandomFacts(.15);
		}
	},{
		icon: "➡️",
		fxn: () => {
			world.refreshFacts();
		}
	}, {
		icon: "⏩",
		fxn: () => {
			world.solve()
		}
	}].map(button => {
		return $("<button>", {
			class: "mh-controlbutton",
			html: button.icon
		}).appendTo(this.section.controls).click(button.fxn)
	})



	this.entHolder = createSection(this.section.main, {
		title: "entities",
		classes: "mh-entities",
	})

	this.entViews = mapObject(world.entDirectory, (ent, id) => {
		return new EntView(this.entHolder.main, world, ent)
	})


}