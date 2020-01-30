import VidTextureNode = require('./vid-texture-node');


class VidPaletteTexture extends VidTextureNode
{
  constructor (texData: Uint8Array, texUniformName: string)
  {
    const texWidth = 256;
    const texHeight = 1;
    const texFormat = WebGL2RenderingContext.RGB;
    const texUnit = 0; // palette = 0, colors = 1

    if (texData.length != (texWidth * 3))
      throw new Error(`VidPaletteTexture.constructor() : Unexpected length of pallette data: ${texData.length}`)

    super(texWidth, texHeight, texFormat, texData, texUniformName, texUnit);
  }
}


export = VidPaletteTexture;
