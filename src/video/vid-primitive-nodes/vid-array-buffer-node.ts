import VidBaseNode = require('./vid-base-node');
import VidStateStack = require('./vid-state-stack');

import VidShaderProgram = require('./vid-shader-program');


const _data = new WeakMap<object, Float32Array>();
const _glBuffer = new WeakMap<object, WebGLBuffer>();
const _attrName = new WeakMap<object, string>();
const _attrLoc = new WeakMap<object, number>();


class VidArrayBufferNode implements VidBaseNode
{
  constructor (data: Float32Array | number[], attrName: string)
  {
    if (!(data instanceof Float32Array))
      data = new Float32Array(data);

    _data.set(this, data);
    _attrName.set(this, attrName);
  }

  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    console.log('VidArrayBufferNode.render()');

    const glBuffer = getGlBuffer(this, gl);
    const attrLoc = getAttrLoc(this, gl, state);

    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
    gl.enableVertexAttribArray(attrLoc);
    gl.vertexAttribPointer(attrLoc, 2, gl.FLOAT, false, 0, 0);
  }
}


function getGlBuffer(self: VidArrayBufferNode, gl: WebGL2RenderingContext): WebGLBuffer
{
  let glBuffer = _glBuffer.get(self);

  if (glBuffer === undefined)
  {
    glBuffer = gl.createBuffer() as WebGLBuffer;
    _glBuffer.set(self, glBuffer);

    gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, _data.get(self) as Float32Array, gl.STATIC_DRAW);
  }

  return glBuffer;
}

function getAttrLoc(self: VidArrayBufferNode, gl: WebGL2RenderingContext, state: VidStateStack)
{
  let attrLoc = _attrLoc.get(self);

  if (attrLoc === undefined)
  {
    const attrName = _attrName.get(self) as string;
    attrLoc = VidShaderProgram.getAttributeLoc(gl, state, attrName);
    _attrLoc.set(self, attrLoc);
  }

  return attrLoc;
}


export = VidArrayBufferNode;
