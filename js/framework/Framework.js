var gl;
var shaderProgram;



function initCanvas(context) {
  gl = context;
  shaderProgram = createShaderProgram("vertexShader", "fragmentShader");

  // Set Program Shader to use
	gl.useProgram(shaderProgram);

	// Set color to clear buffers
	gl.clearColor(0., 0., 0., 1.);	// black

	// Set Viewport transformation
	gl.viewport(0, 0, canvas.width, canvas.height);
}

class PointsCollection {

    constructor() {
      this.vertices = []
      this.indexes = 0;
    }

    add(xClipp, yClipp, zClipp) {
      this.vertices.push(xClipp);
      this.vertices.push(yClipp);
      this.vertices.push(0.);
      this.indexes++;
    }

    render() {

      var aSelectedSize = gl.getAttribLocation(shaderProgram, "aSize");
      gl.vertexAttrib1f(aSelectedSize, 6.);

      var aSelectedColour = gl.getAttribLocation(shaderProgram, "aColour");
      gl.vertexAttrib4f(aSelectedColour, 1.0, 1.0, 1.0, 1.0);

      var aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");

      // Create an empty buffer object to store the vertex buffer
      var vertex_buffer = gl.createBuffer();

      //Bind appropriate array buffer to it
      gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

      // Pass the vertex data to the buffer
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

      // Get the attribute location
      var coord = gl.getAttribLocation(shaderProgram, "aPosition");

      // Point an attribute to the currently bound VBO
      gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

      // Enable the attribute
      gl.enableVertexAttribArray(coord);

      // Unbind the buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, null);

      gl.clear(gl.COLOR_BUFFER_BIT);

      var primitiveType = gl.POINTS;		// Primitive type to be rendered
      var offset = 0;						      // Bytes offset in the array buffer
      var count = this.indexes;				// Number of vertices to be rendered
      gl.drawArrays(primitiveType, offset, count);

    }

}

class LinesCollection {

  constructor() {
    this.vertices = []
    this.indexes = 0;
    this.type = gl.LINES;
  }

  setType(type){
    if(type === "LINES") {
      this.type = gl.LINES;
    } else if(type === "LINE_STRIP") {
      this.type = gl.LINE_STRIP;
    } else if(type === "LINE_LOOP") {
      this.type = gl.LINE_LOOP;
    }
  }

  addVertex(xClipp, yClipp, zClipp) {
    this.vertices.push(xClipp);
    this.vertices.push(yClipp);
    this.vertices.push(zClipp);
    this.indexes++;
  }

  render() {

    var aSelectedColour = gl.getAttribLocation(shaderProgram, "aColour");
    gl.vertexAttrib4f(aSelectedColour, 1.0, 1.0, 1.0, 1.0);

    // Create an empty buffer object to store the vertex buffer
    var vertex_buffer = gl.createBuffer();

    //Bind appropriate array buffer to it
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Pass the vertex data to the buffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "aPosition");

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    // Unbind the buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    gl.clear(gl.COLOR_BUFFER_BIT);

    var primitiveType = this.type;		// Primitive type to be rendered
    var offset = 0;						      // Bytes offset in the array buffer
    var count = this.indexes;				// Number of vertices to be rendered
    gl.drawArrays(primitiveType, offset, count);

  }

}

class TriangleCollection{
  constructor() {
    this.vertices = []
    this.indices = []
    this.indexes = 0;
    this.type = gl.TRIANGLES;
  }

  setType(type){
    if(type === "TRIANGLES") {
      this.type = gl.TRIANGLES;
    } else if(type === "TRIANGLE_STRIP") {
      this.type = gl.TRIANGLE_STRIP;
    } else if(type === "TRIANGLE_FAN") {
      this.type = gl.TRIANGLE_FAN;
    }
  }

  addVertex(xClipp, yClipp, zClipp) {
    this.vertices.push(xClipp);
    this.vertices.push(yClipp);
    this.vertices.push(zClipp);
    this.indices.push(this.indexes);
    this.indexes++;
  }

  render(){
    var aSelectedSize = gl.getAttribLocation(shaderProgram, "aSize");
    gl.vertexAttrib1f(aSelectedSize, 6.);

    var aSelectedColour = gl.getAttribLocation(shaderProgram, "aColour");
    gl.vertexAttrib4f(aSelectedColour, 1.0, 1.0, 1.0, 1.0);

    // Set Program Shader to use
    gl.useProgram(shaderProgram);
    // VBO
    var vbo = gl.createBuffer();
    var bufferType = gl.ARRAY_BUFFER;			// Buffer type to storage float data
    gl.bindBuffer(bufferType, vbo);				// Bind to a type of buffer
    var data = new Float32Array(this.vertices);		// Data to be storage in a Buffer (a raw device)
    var usage = gl.STATIC_DRAW;					// Used for drawing optimization
    gl.bufferData(bufferType, data, usage);		// Load data into the Buffer
    // IBO
    var ibo = gl.createBuffer();
    var bufferType = gl.ELEMENT_ARRAY_BUFFER;	// Buffer type to storage float data
    gl.bindBuffer(bufferType, ibo);				// Bind to a type of buffer
    var data = new Uint16Array(this.indices);		// Data to be storage in a Buffer (a raw device)
    var usage = gl.STATIC_DRAW;					// Used for drawing optimization
    gl.bufferData(bufferType, data, usage);		// Load data into the Buffer


    gl.useProgram(shaderProgram);				// Set the current Shader Program to use
    var bufferType = gl.ARRAY_BUFFER;			// Buffer type to storage float data
    gl.bindBuffer(bufferType, vbo);	// Bind to a type of buffer
    var aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");	// Locate attribute position
    var index = aPositionLocation;				// index of the attribute location
    var size = 3; 								// The number of components per attribute
    var type = gl.FLOAT; 						// The data type of each component
    var normalized = false; 					// Whether integer values should be normalized
    var stride = 0; 							// Offset in bytes between consecutive attributes
    var offset = 0;								// Offset in bytes of the first attribute
    gl.vertexAttribPointer(index, size, type, normalized, stride, offset); // Tell Vertex Shader how to retrieve data from the Buffer
    gl.enableVertexAttribArray(aPositionLocation);	// Enable attribute


    // Clear the Color Buffer now using the current clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw scene
    //var primitiveType = gl.POINTS;		// Primitive type to be rendered
    //var primitiveType = gl.LINES;		// Dibuja lineas
    var primitiveType = this.type;	// Dibuja Triangulos
    var count = this.indices.length;			// Number of elements (indices) to be rendered
    var type = gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
    var offset = 0; 					// Bytes offset in the element array buffer
    gl.drawElements(primitiveType, count, type, offset);
  }
}