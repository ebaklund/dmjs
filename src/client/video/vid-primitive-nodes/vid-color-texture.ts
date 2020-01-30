import VidTextureNode = require('./vid-texture-node');


class VidColorTexture extends VidTextureNode
{
  constructor (texWidth: number, texHeight: number, texData: Uint8Array, texUniformName: string)
  {
    if ((texWidth * texHeight) !== texData.length)
      throw new Error('VidColorTexture.constructor(): Texture geometry does not match amount texture data.');

    const texFormat = WebGL2RenderingContext.LUMINANCE;
    const texUnit = 1; // palette = 0, colors = 1

    super(texWidth, texHeight, texFormat, texData, texUniformName, texUnit);
  }
}


export = VidColorTexture;
