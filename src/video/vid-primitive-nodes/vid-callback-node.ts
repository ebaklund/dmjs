import VidBaseNode = require('./vid-base-node');
import VidStateStack = require('./vid-state-stack');

const _cb = new WeakMap<object, () => void>();


class VidCallbackNode implements VidBaseNode
{
  constructor (callback: () => void )
  {
    _cb.set(this, callback);
  }

  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    console.log('VidCallbackNode.render()');

    (_cb.get(this) as () => void)();
  }
}

export = VidCallbackNode;
