'use strict';

import WadPatch = require('../../server/wad/wad-patch');
import WadPalette = require('../../server/wad/wad-palette');
import VidStateStack = require('./vid-primitive-nodes/vid-state-stack');
import VidBaseNode = require('./vid-primitive-nodes/vid-base-node');
import VidGroupNode = require('./vid-primitive-nodes/vid-group-node');
import VidSwitchNode = require('./vid-primitive-nodes/vid-switch-node');
import VidViewportNode = require('./vid-primitive-nodes/vid-viewport-node');
import VidClearNode = require('./vid-primitive-nodes/vid-clear-node');
import VidPatchNode = require('./vid-game-nodes/vid-patch-node');


const _gl = new WeakMap<object, WebGL2RenderingContext>();
const _root = new WeakMap<object, VidGroupNode>();
const _sceneNode = new WeakMap<object, VidSwitchNode>();
const _nodes = new WeakMap<object, VidBaseNode>();


class VidController
{
  static from (gl: WebGL2RenderingContext): VidController
  {
    return new VidController(gl);
  }

  constructor (gl: WebGL2RenderingContext)
  {
    const sceneNode = new VidSwitchNode();

    const root = new VidGroupNode([
      new VidViewportNode(),
      new VidClearNode([0.5, 0.5, 0.5, 1.0]),
      sceneNode
    ]);

    _gl.set(this, gl);
    _root.set(this, root);
    _sceneNode.set(this, sceneNode);
  }

  async drawPageFromPatch (nodeLabel: string, patch: WadPatch, palette: WadPalette)
  {
    // credit
    console.log('Game.drawPage()');

    const sceneNode = _sceneNode.get(this) as VidSwitchNode;
    let patchNode = sceneNode.get(nodeLabel);

    if (patchNode === undefined)
    {
      patchNode = new VidPatchNode(patch, palette);
      sceneNode.set(nodeLabel, patchNode);
    }

    sceneNode.switch(nodeLabel);

    const gl = _gl.get(this) as WebGL2RenderingContext;
    const root = _root.get(this) as VidGroupNode;

    await root.render(gl, new VidStateStack());

  }

}

export = VidController;
