const _tx = new WeakMap<object, WebGLTexture>();

class GlPatch
{
  static from (gl: WebGL2RenderingContext, width: number, height:number, data: Int8Array)
  {
    const level = 0;
    const internalFormat = gl.LUMINANCE;
    const border = 0;
    const format = gl.LUMINANCE;
    const type = gl.UNSIGNED_BYTE;

    const tx = gl.createTexture() as WebGLTexture;
    gl.bindTexture(gl.TEXTURE_2D, tx);

    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, width, height, border, format, type, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  constructor (tx: WebGLTexture)
  {
    console.log('GlPatch.constructor()');

    _tx.set(this, tx);
  }

  get tx(): WebGLTexture
  {
    return _tx.get(this) as WebGLTexture;
  }
}

export = GlPatch;