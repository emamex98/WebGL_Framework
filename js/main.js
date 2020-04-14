function main() {
	// Init WebGL rendering context
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("webgl");

	// FRAMEWORK: INIT CANVAS
	var scene = new Scene(context, canvas);

	// *************************************** //
	// UNCOMMENT SECTION TO DRAW SAMPLE POINTS //

	// // FRAMEWORK: INIT POINTS
	var points = new PointsCollection(scene);

	// // FRAMEWORK: ADD POINTS TO ARRAY
	points.add(0.022, 0.052, 0.0);
	points.add(-0.022, -0.052, 0.0);
	points.add(-0.05, 0.7, 0.0);

	// // FRAMEWORK: RENDER POINTS
	// scene.render();

	// *************************************** //
	// UNCOMMENT SECTION TO DRAW SAMPLE LINES //

	// // FRAMEWORK: INIT LINES
	var lines = new LinesCollection(scene);

	// // FRAMEWORK: CHANGE LINE RENDER TYPE
	// // lines.setType("LINE_STRIP");
	// // lines.setType("LINE_LOOP");

	// // FRAMEWORK: ADD VERTICES TO ARRAY
	lines.addVertex(-0.7,-0.1,0.0);
	lines.addVertex(-0.3,0.6,0.0);
	lines.addVertex(-0.3,-0.3,0.0);
	lines.addVertex(0.2,0.6,0.0);
	lines.addVertex(0.3,-0.3,0.0);
	lines.addVertex(0.7,0.6,0.0);

	// // FRAMEWORK: RENDER LINES
	// scene.render();


	// *************************************** //

	// *************************************** //
	// UNCOMMENT SECTION TO DRAW TRIANGLES //

	// // FRAMEWORK: INIT TRIANGLES
	var triangles = new TriangleCollection(scene);

	// // FRAMEWORK: CHANGE TRIANGLE RENDER TYPE
	// triangles.setType("TRIANGLE_STRIP");
	// triangles.setType("TRIANGLE_FAN");

	// // FRAMEWORK: ADD VERTICES TO ARRAY IN ORDER
	triangles.addVertex(-0.3, 0.2, 0.);
	triangles.addVertex(0, 0.5, 0.);
	triangles.addVertex(0.3, 0.2, 0.);
	triangles.addVertex(0, -0.5, 0.);
	triangles.addVertex(0.5, -0.5, 0.);
	triangles.addVertex(0.5, -0.8, 0.);

	// // FRAMEWORK: RENDER TRIANGLES
	scene.render();

	// *************************************** //
}
