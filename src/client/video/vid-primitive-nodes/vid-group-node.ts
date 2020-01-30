import VidBaseNode = require('./vid-base-node');
import VidStateStack = require('./vid-state-stack');

const _children = new WeakMap<object, VidBaseNode[]>();

class VidGroupNode implements VidBaseNode
{
  constructor (children: VidBaseNode[] | void)
  {
    _children.set(this, children || []);
  }

  set children (children: VidBaseNode[])
  {
    _children.set(this, children);
  }

  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    console.log('VidGroupNode.render()');

    const children = _children.get(this) as VidBaseNode[];
    const n = children.length;

    for (let i = 0; i < n; ++i)
      await children[i].render(gl, state);
  }
}

export = VidGroupNode;
