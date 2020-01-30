import VidBaseNode = require('../vid-primitive-nodes/vid-base-node');

import VidStateStack = require('../vid-primitive-nodes/vid-state-stack');
import VidCallbackNode = require('../vid-primitive-nodes/vid-callback-node');
import VidSeparatorNode = require('../vid-primitive-nodes/vid-separator-node');
import VidArrayBufferNode = require('../vid-primitive-nodes/vid-array-buffer-node');
import VidVertexShader = require('../vid-primitive-nodes/vid-vertex-shader');
import VidFragmentShader = require('../vid-primitive-nodes/vid-fragment-shader');
import VidShaderProgram = require('../vid-primitive-nodes/vid-shader-program');


const _root = new WeakMap<object, VidBaseNode>();

class VidPurpleQuadNode implements VidBaseNode
{
  constructor ()
  {
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
          gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);
        }
      `),
      new VidShaderProgram(),
      new VidArrayBufferNode([
        0.0, 0.0,  0.0, 0.5,  0.7, 0.0,
        0.7, 0.0,  0.0, 0.5,  0.7, 0.5
      ], 'a_position'),
      new VidCallbackNode((gl: WebGL2RenderingContext, state: VidStateStack) => gl.drawArrays(WebGL2RenderingContext.TRIANGLES, 0, 6))
    ]);

    _root.set(this, root);
  }

  async render (gl: WebGL2RenderingContext, state: VidStateStack)
  {
    console.log('VidPurpleQuadNode.render()');

    (_root.get(this) as VidBaseNode).render(gl, state);
  }
}

export = VidPurpleQuadNode;
