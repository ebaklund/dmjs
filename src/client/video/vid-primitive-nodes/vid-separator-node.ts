import VidGroupNode = require('./vid-group-node');
import VidBaseNode = require('./vid-base-node');
import VidStateStack = require('./vid-state-stack');

const _state = new WeakMap<object, Map<string, object>>();

class VidSeparatorNode extends VidGroupNode
{
  constructor (children: VidBaseNode[] | void)
  {
    super(children);
  }

  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    state.push();
    await super.render(gl, state);
    state.pop();
  }
}

export = VidSeparatorNode;
