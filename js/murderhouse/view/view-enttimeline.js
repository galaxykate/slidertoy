function EntTimelineView(holder) {


	this.timelineHolder = $("<div/>", {
		class: "mh-timeline",
	}).appendTo(holder)


	this.labels = $("<div/>", {
		class: "mh-timeline-slice",
	}).appendTo(this.timelineHolder);

	this.timeslice = []
	// Create a grid
	for (var i = 0; i < timeCount; i++) {
		this.timeslice[i] = $("<div/>", {
			class: "mh-timeline-slice",
		}).appendTo(this.timelineHolder);
	}
}

EntTimelineView.prototype.setToEnt = function(entity) {
	this.ent = entity
	this.conditionTypes = entity.world.type.getMatchingFactTypes("condition", entity.type)

	this.timesteps = []
	this.labels.html("")

	for (var j = 0; j < this.conditionTypes.length; j++) {
		let box = $("<div/>", {
			html: this.conditionTypes[j].id,
			class: "mh-timeline-label"
		}).appendTo(this.labels)
	}
	for (var i = 0; i < timeCount; i++) {
		this.timesteps[i] = []
		let condStep = this.ent.timeline[i].conditions;
		this.timeslice[i].html("");
		for (var j = 0; j < this.conditionTypes.length; j++) {
			this.timesteps[i][j] = $("<div/>", {
				html: "▫️",
				class: "mh-timeline-box"
			}).appendTo(this.timeslice[i])


		}
	}

	this.update();
}

EntTimelineView.prototype.update = function(entity) {
	
	for (var i = 0; i < timeCount; i++) {
		let condStep = this.ent.timeline[i].conditions;

		for (var j = 0; j < this.conditionTypes.length; j++) {
				let id = this.conditionTypes[j].id
			if (condStep[id] !== undefined) {
				if (condStep[id] === true)
					this.timesteps[i][j].html("🔲")
				else
					this.timesteps[i][j].html("◼️")
			}
		}
	}
}