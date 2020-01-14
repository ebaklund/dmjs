import VidBaseNode = require('./vid-base-node');
import VidShaderProgram = require('./vid-shader-program');
import VidStateStack = require('./vid-state-stack');
import { isNullOrUndefined } from 'util';


const _width = new WeakMap<object, number>();
const _height = new WeakMap<object, number>();
const _format = new WeakMap<object, number>();
const _data = new WeakMap<object, Uint8Array>();
const _glTexture = new WeakMap<object, WebGLTexture>();
const _uniformName = new WeakMap<object, string>();
const _uniformLoc = new WeakMap<object, WebGLUniformLocation>();
const _texUnit = new WeakMap<object, number>();


class VidTextureNode implements VidBaseNode
{
  constructor (width: number, height: number, format: number, data: Uint8Array, uniformName: string, texUnit: number)
  {
    _width.set(this, width);
    _height.set(this, height);
    _format.set(this, format);
    _data.set(this, data);
    _uniformName.set(this, uniformName);
    _texUnit.set(this, texUnit);
  }

  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    console.log('VidTextureNode.render()');

    const glTexture = getGlTexture(this, gl);
    const uniformLoc = getUniformLoc(this, gl, state);
    const texUnit = _texUnit.get(this) as number;

    gl.activeTexture(gl.TEXTURE0 + texUnit);
    gl.bindTexture(gl.TEXTURE_2D, glTexture);
    gl.uniform1i(uniformLoc, texUnit);
  }
}

function getGlTexture (self: VidTextureNode, gl: WebGL2RenderingContext): WebGLBuffer
{
  let glTexture = _glTexture.get(self);

  if (!glTexture)
  {
    glTexture = createTexture(self, gl);
    _glTexture.set(self, glTexture);
  }

  return glTexture;
}

function createTexture (self: VidTextureNode, gl: WebGL2RenderingContext): WebGLBuffer
{
  const level = 0;
  const internalFormat = _format.get(self) as number;
  const format = _format.get(self) as number;
  const width = _width.get(self) as number;
  const height = _height.get(self) as number;
  const border = 0;
  const type = gl.UNSIGNED_BYTE;
  const data = _data.get(self) as Uint8Array;
  const texUnit = _texUnit.get(self) as number;

  const glTexture = gl.createTexture();

  if (!glTexture)
    throw new Error('VidTexture.create(): Failed to create vertex WebGLTexture.');

  gl.activeTexture(gl.TEXTURE0 + texUnit);
  gl.bindTexture(gl.TEXTURE_2D, glTexture);

  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  return glTexture;
}

function getUniformLoc(self: VidTextureNode, gl: WebGL2RenderingContext, state: VidStateStack): WebGLUniformLocation
{
  let uniformLoc = _uniformLoc.get(self);

  if (isNullOrUndefined(uniformLoc))
  {
    const uniformName = _uniformName.get(self) as string;
    uniformLoc = VidShaderProgram.getUniformLoc(gl, state, uniformName);
    _uniformLoc.set(self, uniformLoc);
  }

  return uniformLoc;
}


export = VidTextureNode;
