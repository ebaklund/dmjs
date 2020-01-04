import VidBaseNode = require('./vid-base-node');
import VidStateStack = require('./vid-state-stack');


const _shaderType = new WeakMap<object, number>();
const _tmpSource = new WeakMap<object, string>();
const _glShader = new WeakMap<object, WebGLShader>();


function compile (gl: WebGL2RenderingContext, shaderType: number, source: string): WebGLShader
{
  const shader = gl.createShader(shaderType);

  if (!shader)
    throw new Error('VidShaderFactory.compile(): Failed to create shader.');

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw new Error('VidShaderFactory.compile(): Failed to compile shader. ' + gl.getShaderInfoLog(shader));

  return shader;
}


class VidBaseShader implements VidBaseNode
{
  constructor (shaderType: number, source: string)
  {
    _shaderType.set(this, shaderType);
    _tmpSource.set(this, source);
  }

  getGlShader(gl: WebGL2RenderingContext)
  {
    let glShader = _glShader.get(this);

    if (!glShader)
    {
      glShader = compile(gl, _shaderType.get(this) as number, _tmpSource.get(this) as string);
      _glShader.set(this, glShader);
      _tmpSource.delete(this);
    }

    return glShader;
  }

  async render(gl: WebGL2RenderingContext, state: VidStateStack)
  {
  }
}

export = VidBaseShader
