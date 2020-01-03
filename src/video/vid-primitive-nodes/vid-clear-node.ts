import VidStateStack = require('./vid-state-stack');


type Color = [number, number, number, number];

const _color = new WeakMap<object, Color>();


class VidClearNode
{
  constructor (color: Color | void)
  {
    _color.set(this, color || [0, 0, 0, 1]);
  }

  async render(gl: WebGL2RenderingContext, state: VidStateStack)
  {
    gl.clearColor(...(_color.get(this) as Color));
    gl.clear(WebGL2RenderingContext.COLOR_BUFFER_BIT);
  }
};

export = VidClearNode;
