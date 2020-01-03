const _tmpVertices = new WeakMap<object, number[]>();
const _glBuffer = new WeakMap<object, WebGLBuffer>();


function create (gl: WebGL2RenderingContext, vertices: number[]): WebGLBuffer
{
  const glBuffer = gl.createBuffer();

  if (!glBuffer)
    throw new Error('VidVertexBuffer.create(): Failed to create vertex WebGLBuffer.');

  gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  return glBuffer;
}


class VidVertexBuffer
{
  constructor (vertices: number[])
  {
    _tmpVertices.set(this, vertices);
  }

  getGlBuffer (gl: WebGL2RenderingContext): WebGLBuffer
  {
    let glBuffer = _glBuffer.get(this);

    if (!glBuffer)
    {
      glBuffer = create(gl, _tmpVertices.get(this) as number[]);
      _tmpVertices.delete(this);
    }

    return glBuffer;
  }

}

export = VidVertexBuffer;
