let editor, view;
$(function() {
	// Create a tracery editor and view

	editor = new TraceryEditor("#section-editor>.section-main")
	view = new TraceryView("#section-view>.section-main")
	view.generate();
	editor.setColorMode()
})