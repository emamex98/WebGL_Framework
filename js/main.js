function main()
{
	// Init WebGL rendering context
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("webgl");

	// FRAMEWORK: INIT CANVAS
	initCanvas(context);

	// *************************************** //
	// UNCOMMENT SECTION TO DRAW SAMPLE POINTS //

	// // FRAMEWORK: INIT POINTS
	// var points = new PointsCollection();

	// // FRAMEWORK: ADD POINTS TO ARRAY
	// points.add(0.022, 0.052, 0.0);
	// points.add(-0.022, -0.052, 0.0);
	// points.add(-0.05, 0.7, 0.0);

	// // FRAMEWORK: RENDER POINTS
	// points.render();

	// *************************************** //
	// UNCOMMENT SECTION TO DRAW SAMPLE LINES //

	// // FRAMEWORK: INIT LINES
	// var lines = new LinesCollection();

	// // FRAMEWORK: CHANGE LINE RENDER TYPE
	// // lines.setType("LINE_STRIP");
	// // lines.setType("LINE_LOOP");

	// // FRAMEWORK: ADD VERTICES TO ARRAY
	// lines.addVertex(-0.7,-0.1,0.0);
	// lines.addVertex(-0.3,0.6,0.0);
	// lines.addVertex(-0.3,-0.3,0.0);
	// lines.addVertex(0.2,0.6,0.0);
	// lines.addVertex(0.3,-0.3,0.0);
	// lines.addVertex(0.7,0.6,00);

	// // FRAMEWORK: RENDER LINES
	// lines.render();

	// *************************************** //

	
}
