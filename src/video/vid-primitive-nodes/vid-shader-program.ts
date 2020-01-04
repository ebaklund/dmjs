import VidGroupNode = require('./vid-group-node');
import VidStateStack = require('./vid-state-stack');

import VidVertexShader = require('./vid-vertex-shader');
import VidFragmentShader = require('./vid-fragment-shader');


const _vertexShader = new WeakMap<object, VidVertexShader>();
const _fragmentShader = new WeakMap<object, VidFragmentShader>();
const _glProgram = new WeakMap<object, WebGLProgram>();


class VidShaderProgram extends VidGroupNode
{
  constructor ()
  {
    super();
  }

  getGlProgram (gl: WebGL2RenderingContext, state: VidStateStack): WebGLProgram
  {
    let glProgram = _glProgram.get(this);

    if (glProgram === undefined)
    {
      const vertexShader = state.get(VidVertexShader) as VidVertexShader | undefined;
      if (vertexShader === undefined)
        throw new Error('VidShaderProgram.getGlProgram(): Failed to locate VidVertexShader');

      const fragmentShader = state.get(VidFragmentShader) as VidFragmentShader | undefined;
      if (fragmentShader === undefined)
        throw new Error('VidShaderProgram.getGlProgram(): Failed to locate VidFragmentShader');

      glProgram = createGlProgram(gl, vertexShader, fragmentShader);
      _glProgram.set(this, glProgram);
    }

    return glProgram;
  }

  async render(gl: WebGL2RenderingContext, state: VidStateStack)
  {
    console.log('VidShaderProgram.render()');

    gl.useProgram(this.getGlProgram(gl, state));
    state.set(VidShaderProgram, this);

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
