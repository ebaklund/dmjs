import VidGroupNode = require('./vid-group-node');
import VidStateStack = require('./vid-state-stack');

const _childIndex = new WeakMap<object, number>();

class VidSwitchNode extends VidGroupNode
{
  constructor ()
  {
    super();
    _childIndex.set(this, -1);
  }

  set childIndex (i: number)
  {
    if (i < -1 || i >= this.children.length)
      throw new Error(`VidSwitchNode.whichChild(): Index out of bounds i: ${i}`)

    _childIndex.set(this, i);
  }

  get childIndex (): number
  {
    return _childIndex.get(this) as number;
  }

  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    const childIndex = this.childIndex;

    if (childIndex <= -1)
      return;

    await this.children[childIndex].render(gl, state);
  }
}