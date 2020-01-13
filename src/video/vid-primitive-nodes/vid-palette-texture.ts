import VidTextureNode = require('./vid-texture-node');


class VidPaletteTexture extends VidTextureNode
{
  constructor (texData: Uint8Array)
  {
    const texWidth = 256;
    const texHeight = 1;
    const texFormat = WebGL2RenderingContext.RGBA;
    const texUniformName = 'u_palette';
    const texUnit = 0; // palette = 0, colors = 1

    super(texWidth, texHeight, texFormat, texData, texUniformName, texUnit);
  }
}
