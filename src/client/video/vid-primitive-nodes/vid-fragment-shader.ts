import VidBaseShader = require('./vid-base-shader');
import VidStateStack = require('./vid-state-stack');


class VidFragmentShader extends VidBaseShader
{
  constructor (source: string)
  {
    super(WebGL2RenderingContext.FRAGMENT_SHADER, source);
  }

  async render(gl: WebGL2RenderingContext, state: VidStateStack)
  {
    state.set(VidFragmentShader, this);
    super.render(gl, state);
  }
}

export = VidFragmentShader;