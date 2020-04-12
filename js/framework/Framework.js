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