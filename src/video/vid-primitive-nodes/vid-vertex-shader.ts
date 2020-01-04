import VidShaderBase = require('./vid-base-shader');
import VidStateStack = require('./vid-state-stack');


class VidVertexShader extends VidShaderBase
{
  constructor (source: string)
  {
    super(WebGL2RenderingContext.VERTEX_SHADER, source);
  }

  async render(gl: WebGL2RenderingContext, state: VidStateStack)
  {
    state.set(VidVertexShader, this);
    super.render(gl, state);
  }
}

export = VidVertexShader;