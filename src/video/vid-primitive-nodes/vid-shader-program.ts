import VidGroupNode = require('./vid-group-node');

import VidVertexShader = require('./vid-vertex-shader');
import VidFragmentShader = require('./vid-fragment-shader');
import VidStateStack = require('./vid-state-stack');


const _vs = new WeakMap<object, VidVertexShader>();
const _fs = new WeakMap<object, VidFragmentShader>();
const _gvl = new WeakMap<object, number>();
const _tvl = new WeakMap<object, number>();
const _glp = new WeakMap<object, WebGLProgram>();


class VidShaderProgram extends VidGroupNode
{
  constructor (vertexShaderSource: string, fragmentShaderSource: string)
  {
    super();
    _vs.set(this, new VidVertexShader(vertexShaderSource));
    _fs.set(this, new VidFragmentShader(fragmentShaderSource));
  }

  getGlProgram (gl: WebGL2RenderingContext): WebGLProgram
  {
    let glp = _glp.get(this);

    if (glp === undefined)
    {
      glp = createGlProgram(gl, _vs.get(this) as VidVertexShader, _fs.get(this) as VidFragmentShader);
      _glp.set(this, glp);
    }

    return glp;
  }

  getGeometryVerticesLocation (gl: WebGL2RenderingContext): number
  {
    let gvl = _gvl.get(this);

    if (gvl === undefined)
    {
      gvl = gl.getAttribLocation(this.getGlProgram(gl), "a_geometry_vertices");
      _gvl.set(this, gvl);
    }

    return gvl as number;
  }

  getTextureVerticesLocation (gl: WebGL2RenderingContext): number
  {
    let tvl = _tvl.get(this);

    if (tvl === undefined)
    {
      tvl = gl.getAttribLocation(this.getGlProgram(gl), "a_texture_vertices");
      _tvl.set(this, tvl);
    }

    return tvl as number;
  }

  get paletteTextureUnit (): number
  {
    return WebGL2RenderingContext.TEXTURE0;
  }

  get colorTextureUnit (): number
  {
    return WebGL2RenderingContext.TEXTURE1;
  }

  async render(gl: WebGL2RenderingContext, state: VidStateStack)
  {
    gl.useProgram(this.getGlProgram(gl));
    await super.render(gl, state);
  }
}

function createGlProgram (gl: WebGL2RenderingContext, vs: VidVertexShader, fs: VidFragmentShader)
{
  const glProgram = gl.createProgram() as WebGLProgram;

  if (!glProgram)
    throw new Error('VidShaderProgram.create() Failed to create WebGLProgram.');

  gl.attachShader(glProgram, vs.getGlShader(gl));
  gl.attachShader(glProgram, fs.getGlShader(gl));
  gl.linkProgram(glProgram);

  if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS))
    throw new Error('VidShaderProgram.create(): Failed to link shader program. ' + gl.getProgramInfoLog(glProgram));

  return glProgram;
}

export = VidShaderProgram;
