import VidBaseNode = require('./vid-base-node');
import VidStateStack = require('./vid-state-stack');


const _nodeDict = new WeakMap<object, Map<string, VidBaseNode>>();
const _selectedNode = new WeakMap<object, VidBaseNode>();


class VidSwitchNode implements VidBaseNode
{
  constructor ()
  {
    _nodeDict.set(this, new Map<string, VidBaseNode>());
  }

  get (label: string): VidBaseNode | undefined
  {
    return (_nodeDict.get(this) as Map<string, VidBaseNode>).get(label);
  }

  set (label: string, node: VidBaseNode)
  {
    (_nodeDict.get(this) as Map<string, VidBaseNode>).set(label, node);
  }

  switch (label: string)
  {
    const node = this.get(label);

    if (node === undefined)
      throw new Error(`VidSwitchNode.switch(): Selected node not found: '${label}'`)

    _selectedNode.set(this, node);
  }


  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    const selectedNode = _selectedNode.get(this);

    if (selectedNode === undefined)
      throw new Error('VidSwitchNode.render(): no child node is selected.');

    await selectedNode.render(gl, state);
  }
}

export = VidSwitchNode;
