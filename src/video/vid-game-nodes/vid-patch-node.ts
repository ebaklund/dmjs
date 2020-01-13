import VidBaseNode = require('../vid-primitive-nodes/vid-base-node');

import VidStateStack = require('../vid-primitive-nodes/vid-state-stack');
import VidCallbackNode = require('../vid-primitive-nodes/vid-callback-node');
import VidSeparatorNode = require('../vid-primitive-nodes/vid-separator-node');
import VidArrayBufferNode = require('../vid-primitive-nodes/vid-array-buffer-node');
import VidVertexShader = require('../vid-primitive-nodes/vid-vertex-shader');
import VidFragmentShader = require('../vid-primitive-nodes/vid-fragment-shader');
import VidShaderProgram = require('../vid-primitive-nodes/vid-shader-program');
import VidColorTexture = require('../vid-primitive-nodes/vid-color-texture');
import VidMatrix = require('../vid-matrix');

import WadPatch = require('../../wad/wad-patch');


const _root = new WeakMap<object, VidBaseNode>();

class VidPatchNode implements VidBaseNode
{
  constructor (patch: WadPatch)
  {
    /*
    const [ x, y ] = VidMatrix.vecToGl([ patch.x, patch.y ]);
    const [ w, h ] = VidMatrix.sizeToGl([ patch.width, patch.height ]);
  */
    const [ x, y ] = VidMatrix.vecToGl([ 50, 50 ]);
    const [ w, h ] = VidMatrix.sizeToGl([ 50, 50 ]);


    const root = new VidSeparatorNode([
//        varying   vec2 v_texcoord;
//          v_texcoord = a_position.xy * vec2(0.5, -0.5) + 0.5;
      new VidVertexShader(`
        attribute vec4 a_position;

        void main() {
          gl_Position = a_position;
        }
      `),
/*
        varying vec2 v_texcoord;
        uniform sampler2D u_colorIndices;
        uniform sampler2D u_palette;
*/
      new VidFragmentShader(`
        precision mediump float;

        void main() {
          gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        }
      `),
      new VidShaderProgram(),
      new VidArrayBufferNode([
        x, y,  x + w, y,  x + w, y + h,
        x, y,  x + w, y + h,  x, y + h
      ], 'a_position'),
//      new VidColorTexture(patch.width, patch.height, patch.cache, 'u_colorIndices'),
      new VidCallbackNode((gl: WebGL2RenderingContext, state: VidStateStack) => gl.drawArrays(WebGL2RenderingContext.TRIANGLES, 0, 6))
    ]);

    _root.set(this, root);
  }

  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    console.log('VidPatchNode.render()');

    (_root.get(this) as VidBaseNode).render(gl, state);
  }
}

export = VidPatchNode;
