import VidBaseNode = require('./vid-base-node');
import VidStateStack = require('./vid-state-stack');

type Callback = (gl: WebGL2RenderingContext, state: VidStateStack) => void;

const _callback = new WeakMap<object, Callback>();


class VidCallbackNode implements VidBaseNode
{
  constructor (callback: Callback )
  {
    _callback.set(this, callback);
  }

  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    console.log('VidCallbackNode.render()');

    (_callback.get(this) as Callback)(gl, state);
  }
}

export = VidCallbackNode;
