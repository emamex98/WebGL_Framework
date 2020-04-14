var gl;
var shaderProgram;

class Scene{
  collections = [];

  constructor(context, canvas) {
    gl = context;
    shaderProgram = createShaderProgram("vertexShader", "fragmentShader");

    this.gl = context;
    this.shaderProgram = createShaderProgram("vertexShader", "fragmentShader");

    // Set Program Shader to use
    this.gl.useProgram(this.shaderProgram);

    // Set color to clear buffers
    this.gl.clearColor(0., 0., 0., 1.);	// black

    // Set Viewport transformation
    this.gl.viewport(0, 0, canvas.width, canvas.height);
  }

  render(){
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    for (let i = 0; i < this.collections.length; i++) {
      this.collections[i].render();
    }
  }

}

class PointsCollection {

    constructor(scene) {
      this.scene = scene;
      this.vertices = [];
      this.indexes = 0;
      this.scene.collections.push(this);
    }

    add(xClipp, yClipp, zClipp) {
      this.vertices.push(xClipp);
      this.vertices.push(yClipp);
      this.vertices.push(0.);
      this.indexes++;
    }

    render() {

      var aSelectedSize = this.scene.gl.getAttribLocation(this.scene.shaderProgram, "aSize");
      this.scene.gl.vertexAttrib1f(aSelectedSize, 6.);

      var aSelectedColour = this.scene.gl.getAttribLocation(this.scene.shaderProgram, "aColour");
      this.scene.gl.vertexAttrib4f(aSelectedColour, 1.0, 1.0, 1.0, 1.0);

      var aPositionLocation = this.scene.gl.getAttribLocation(this.scene.shaderProgram, "aPosition");

      // Create an empty buffer object to store the vertex buffer
      var vertex_buffer = this.scene.gl.createBuffer();

      //Bind appropriate array buffer to it
      this.scene.gl.bindBuffer(this.scene.gl.ARRAY_BUFFER, vertex_buffer);

      // Pass the vertex data to the buffer
      this.scene.gl.bufferData(this.scene.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.scene.gl.STATIC_DRAW);

      // Get the attribute location
      var coord = this.scene.gl.getAttribLocation(this.scene.shaderProgram, "aPosition");

      // Point an attribute to the currently bound VBO
      this.scene.gl.vertexAttribPointer(coord, 3, this.scene.gl.FLOAT, false, 0, 0);

      // Enable the attribute
      this.scene.gl.enableVertexAttribArray(coord);

      // Unbind the buffer
      this.scene.gl.bindBuffer(this.scene.gl.ARRAY_BUFFER, null);

      var primitiveType = this.scene.gl.POINTS;		// Primitive type to be rendered
      var offset = 0;						      // Bytes offset in the array buffer
      var count = this.indexes;				// Number of vertices to be rendered
      this.scene.gl.drawArrays(primitiveType, offset, count);

    }

}

class LinesCollection {

  constructor(scene) {
    this.scene = scene;
    this.vertices = []
    this.indexes = 0;
    this.type = this.scene.gl.LINES;
    this.scene.collections.push(this);
  }

  setType(type){
    if(type === "LINES") {
      this.type = this.scene.gl.LINES;
    } else if(type === "LINE_STRIP") {
      this.type = this.scene.gl.LINE_STRIP;
    } else if(type === "LINE_LOOP") {
      this.type = this.scene.gl.LINE_LOOP;
    }
  }

  addVertex(xClipp, yClipp, zClipp) {
    this.vertices.push(xClipp);
    this.vertices.push(yClipp);
    this.vertices.push(zClipp);
    this.indexes++;
  }

  render() {

    var aSelectedColour = this.scene.gl.getAttribLocation(this.scene.shaderProgram, "aColour");
    this.scene.gl.vertexAttrib4f(aSelectedColour, 1.0, 1.0, 1.0, 1.0);

    // Create an empty buffer object to store the vertex buffer
    var vertex_buffer = this.scene.gl.createBuffer();

    //Bind appropriate array buffer to it
    this.scene.gl.bindBuffer(this.scene.gl.ARRAY_BUFFER, vertex_buffer);

    // Pass the vertex data to the buffer
    this.scene.gl.bufferData(this.scene.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.scene.gl.STATIC_DRAW);

    // Get the attribute location
    var coord = this.scene.gl.getAttribLocation(this.scene.shaderProgram, "aPosition");

    // Point an attribute to the currently bound VBO
    this.scene.gl.vertexAttribPointer(coord, 3, this.scene.gl.FLOAT, false, 0, 0);

    // Enable the attribute
    this.scene.gl.enableVertexAttribArray(coord);

    // Unbind the buffer
    this.scene.gl.bindBuffer(this.scene.gl.ARRAY_BUFFER, null);

    //this.scene.gl.clear(this.scene.gl.COLOR_BUFFER_BIT);

    var primitiveType = this.type;		// Primitive type to be rendered
    var offset = 0;						      // Bytes offset in the array buffer
    var count = this.indexes;				// Number of vertices to be rendered
    this.scene.gl.drawArrays(primitiveType, offset, count);

  }

}

class TriangleCollection{
  constructor(scene) {
    this.scene = scene;
    this.vertices = [];
    this.indices = [];
    this.indexes = 0;
    this.type = this.scene.gl.TRIANGLES;
    this.scene.collections.push(this);
  }

  setType(type){
    if(type === "TRIANthis.scene.glES") {
      this.type = this.scene.gl.TRIANGLES;
    } else if(type === "TRIANthis.scene.glE_STRIP") {
      this.type = this.scene.gl.TRIANGLE_STRIP;
    } else if(type === "TRIANthis.scene.glE_FAN") {
      this.type = this.scene.gl.TRIANGLE_FAN;
    }
  }

  addVertex(xClipp, yClipp, zClipp){
    this.vertices.push(xClipp);
    this.vertices.push(yClipp);
    this.vertices.push(zClipp);
    this.indices.push(this.indexes);
    this.indexes++;
  }

  render(){
    var aSelectedSize = this.scene.gl.getAttribLocation(this.scene.shaderProgram, "aSize");
    this.scene.gl.vertexAttrib1f(aSelectedSize, 6.);

    var aSelectedColour = this.scene.gl.getAttribLocation(this.scene.shaderProgram, "aColour");
    this.scene.gl.vertexAttrib4f(aSelectedColour, 1.0, 1.0, 1.0, 1.0);

    // Set Program Shader to use
    this.scene.gl.useProgram(this.scene.shaderProgram);
    // VBO
    var vbo = this.scene.gl.createBuffer();
    var bufferType = this.scene.gl.ARRAY_BUFFER;			// Buffer type to storage float data
    this.scene.gl.bindBuffer(bufferType, vbo);				// Bind to a type of buffer
    var data = new Float32Array(this.vertices);		// Data to be storage in a Buffer (a raw device)
    var usage = this.scene.gl.STATIC_DRAW;					// Used for drawing optimization
    this.scene.gl.bufferData(bufferType, data, usage);		// Load data into the Buffer
    // IBO
    var ibo = this.scene.gl.createBuffer();
    var bufferType = this.scene.gl.ELEMENT_ARRAY_BUFFER;	// Buffer type to storage float data
    this.scene.gl.bindBuffer(bufferType, ibo);				// Bind to a type of buffer
    var data = new Uint16Array(this.indices);		// Data to be storage in a Buffer (a raw device)
    var usage = this.scene.gl.STATIC_DRAW;					// Used for drawing optimization
    this.scene.gl.bufferData(bufferType, data, usage);		// Load data into the Buffer


    this.scene.gl.useProgram(this.scene.shaderProgram);				// Set the current Shader Program to use
    var bufferType = this.scene.gl.ARRAY_BUFFER;			// Buffer type to storage float data
    this.scene.gl.bindBuffer(bufferType, vbo);	// Bind to a type of buffer
    var aPositionLocation = this.scene.gl.getAttribLocation(this.scene.shaderProgram, "aPosition");	// Locate attribute position
    var index = aPositionLocation;				// index of the attribute location
    var size = 3; 								// The number of components per attribute
    var type = this.scene.gl.FLOAT; 						// The data type of each component
    var normalized = false; 					// Whether integer values should be normalized
    var stride = 0; 							// Offset in bytes between consecutive attributes
    var offset = 0;								// Offset in bytes of the first attribute
    this.scene.gl.vertexAttribPointer(index, size, type, normalized, stride, offset); // Tell Vertex Shader how to retrieve data from the Buffer
    this.scene.gl.enableVertexAttribArray(aPositionLocation);	// Enable attribute


    // Clear the Color Buffer now using the current clear color
   // this.scene.gl.clear(this.scene.gl.COLOR_BUFFER_BIT);

    // Draw scene
    var primitiveType = this.type;	// Dibuja Triangulos
    var count = this.indexes;			// Number of elements (indices) to be rendered
    var type = this.scene.gl.UNSIGNED_SHORT; 		// Value type in the element array buffer
    var offset = 0; 					// Bytes offset in the element array buffer
    this.scene.gl.drawElements(primitiveType, count, type, offset);
  }
}