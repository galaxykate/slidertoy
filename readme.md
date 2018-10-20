# Slidertoy

A little platform for procjam 2018.
This provides you with an working "Array of Floats" data structure (see https://www.youtube.com/watch?v=_C9u5r5bLDA).  This platform is best for those with at least some knowledge of javascript, and so far has only been tested on Chrome.   

Not there yet? Try Context Free Art or Tracery first.

Note: ignore the "murderhouse" stuff for now, that's getting folded in in a later version (its an Answer Set Solving tutorial platform)


## To play:

As described in my talk, you can do lots of things to interact with an array-of-float generator.  You can use the sliders to explore on your own, or use one of the auto-walk buttons ">" ">>" to animate it.  You can also play music (may need to be locally hosted)

## To make a new generator:

I've provided two examples (flowers and landscape).  

You'll either modify one of these, or create your own to explore some procedural generation.

Steps to create a new generator:
* add a new file "type-mygeneratorname.js" (etc)
* import that in the slidertoy.html file (like the other ones)

And add the following code to your file 
	types.mygeneratorname = {
		sliders: [],
		draw: (dna, processing) => {},
		createGeometry: (scene, canvasMaterial) => {},
		updateGeometry: (dna) => {}: 
	}

You'll provide the slider names that you want, plus function-code for the following: 

* **draw**(dna, processing) 
* **createGeometry**(scene, canvasMaterial)
* **updateGeometry**(dna)


**Draw** draws something to the processing frame.  It uses processing.js (javascript mode) to draw, so you can use most processing-style commands like "myprocessing.ellipse(0, 0, 300, 300)" or "myprocessing.fill(0, 0, 1)".  I already have the colorspace set up for HSL[0:1] color.

**createGeometry** adds some geometry to the scene with Three.JS.  This function also gives you a material made out of the Processing-drawn screen. You could use this to make: dynamically textured foliage for trees, butterfy wing textures, or patterns for a 3D skirt.


**updateGeometry** modifies that geometry.  This could be everything from changing the size and position of your objects, or reshaping vertices (see the terrain example.)  Go abstract by moving around clouds of shapes, or try to create vases or butterflies or landscapes.
