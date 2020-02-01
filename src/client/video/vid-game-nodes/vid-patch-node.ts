import VidBaseNode = require('../vid-primitive-nodes/vid-base-node');

import VidStateStack = require('../vid-primitive-nodes/vid-state-stack');
import VidCallbackNode = require('../vid-primitive-nodes/vid-callback-node');
import VidSeparatorNode = require('../vid-primitive-nodes/vid-separator-node');
import VidArrayBufferNode = require('../vid-primitive-nodes/vid-array-buffer-node');
import VidVertexShader = require('../vid-primitive-nodes/vid-vertex-shader');
import VidFragmentShader = require('../vid-primitive-nodes/vid-fragment-shader');
import VidShaderProgram = require('../vid-primitive-nodes/vid-shader-program');
import VidColorTexture = require('../vid-primitive-nodes/vid-color-texture');
import VidPaletteTexture = require('../vid-primitive-nodes/vid-palette-texture');
import VidMatrix = require('../vid-matrix');

import WadPatch = require('../../../server/wad/wad-patch');
import WadPalette = require('../../../server/wad/wad-palette');


const _root = new WeakMap<object, VidBaseNode>();

class VidPatchNode implements VidBaseNode
{
  constructor (patch: WadPatch, palette: WadPalette)
  {
    const [ x, y ] = VidMatrix.vecToGl([ patch.x, patch.y ]);
    const [ w, h ] = VidMatrix.sizeToGl([ patch.width, patch.height ]);

    const root = new VidSeparatorNode([
      new VidVertexShader(`
        attribute vec4 a_position;
        varying   vec2 v_texCoord;

        void main() {
          v_texCoord = a_position.xy * vec2(0.5, -0.5) + 0.5;
          gl_Position = a_position;
        }
      `),
      new VidFragmentShader(`
        precision mediump float;

        varying vec2 v_texCoord;
        uniform sampler2D u_colorIndices;
        uniform sampler2D u_palette;

        void main() {
          float i = texture2D(u_colorIndices, v_texCoord).r;
          vec4 c = texture2D(u_palette, vec2(i, 0.5));
          gl_FragColor = texture2D(u_palette, vec2(i, 0.5));
        }
      `),
//          vec4 c = texture2D(u_colorIndices, v_texCoord) / 255.0;
      new VidShaderProgram(),
      new VidArrayBufferNode([
        x, y,  x + w, y,  x + w, y - h,
        x, y,  x + w, y - h,  x, y - h
      ], 'a_position'),
      new VidColorTexture(patch.width, patch.height, patch.cache, 'u_colorIndices'),
      new VidPaletteTexture(palette.texData,'u_palette'),
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
