import VidBaseNode = require('./vid-base-node');
import VidStateStack = require('./vid-state-stack');


type Viewport = [number, number, number, number];
const _viewport = new WeakMap<object, Viewport | undefined>();
const _isSet = new WeakMap<object, boolean>();


class VidViewportNode implements VidBaseNode
{
  constructor (viewport: Viewport | void)
  {
    if (viewport !== undefined)
      _viewport.set(this, viewport)
  }

  async render(gl: WebGL2RenderingContext, state: VidStateStack)
  {
    console.log('VidViewportNode.render()');

    const isSet = _isSet.get(this);

    if (!isSet)
    {
      _isSet.set(this, true);

      const viewport = _viewport.get(this);

      if (viewport === undefined)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      else
        gl.viewport(...viewport);
    }
  }
}

export = VidViewportNode;