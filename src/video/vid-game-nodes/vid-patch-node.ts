import VidBaseNode = require('../vid-primitive-nodes/vid-base-node');

import VidStateStack = require('../vid-primitive-nodes/vid-state-stack');
import VidCallbackNode = require('../vid-primitive-nodes/vid-callback-node');
import VidSeparatorNode = require('../vid-primitive-nodes/vid-separator-node');
import VidArrayBufferNode = require('../vid-primitive-nodes/vid-array-buffer-node');
import VidVertexShader = require('../vid-primitive-nodes/vid-vertex-shader');
import VidFragmentShader = require('../vid-primitive-nodes/vid-fragment-shader');
import VidShaderProgram = require('../vid-primitive-nodes/vid-shader-program');
import VidMatrix = require('../vid-matrix');


const _root = new WeakMap<object, VidBaseNode>();

class VidPatchNode implements VidBaseNode
{
  constructor (xIn: number, yIn: number, widthIn: number, heightIn: number)
  {
    const [ x, y] = VidMatrix.vecToGl([ xIn, yIn ]);
    const [ w, h] = VidMatrix.sizeToGl([ widthIn, heightIn ]);

    const root = new VidSeparatorNode([
      new VidVertexShader(`
        attribute vec4 a_position;

        void main() {
          gl_Position = a_position;
        }
      `),
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
