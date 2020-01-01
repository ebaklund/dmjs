const _gl = new WeakMap();


class GlRenderer
{
  static from(cnv: HTMLCanvasElement): GlRenderer
  {
    return new GlRenderer(cnv.getContext("webgl2") as WebGL2RenderingContext);
  }

  constructor (gl: WebGL2RenderingContext)
  {
    console.log('GlRenderer.constructor()');
    _gl.set(this, gl);
    init(this);
  }

  get gl (): WebGL2RenderingContext
  {
    return _gl.get(this);
  }

  clear ()
  {
    this.gl.clear(WebGL2RenderingContext.COLOR_BUFFER_BIT);
  }

  createTexture (width: number, height: number)
  {
  }
}

function init (self: GlRenderer)
{
  const gl = self.gl;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.disable(self.gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 1);
  self.clear();
}

export = GlRenderer;