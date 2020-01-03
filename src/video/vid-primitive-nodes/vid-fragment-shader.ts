import VidShaderBase = require('./vid-shader-base');

class VidVertexShader extends VidShaderBase
{
  constructor (source: string)
  {
    super(WebGL2RenderingContext.FRAGMENT_SHADER, source);
  }
}

export = VidVertexShader;