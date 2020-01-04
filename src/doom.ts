import WadContent = require('./wad/wad-content');
import VidGroupNode = require('./video/vid-primitive-nodes/vid-group-node');
import VidClearNode = require('./video/vid-primitive-nodes/vid-clear-node');
import VidViewportNode = require('./video/vid-primitive-nodes/vid-viewport-node');
import VidCallbackNode = require('./video/vid-primitive-nodes/vid-callback-node');
import VidSeparatorNode = require('./video/vid-primitive-nodes/vid-separator-node');
import VidStateStack = require('./video/vid-primitive-nodes/vid-state-stack');
import VidArrayBufferNode = require('./video/vid-primitive-nodes/vid-array-buffer-node');
import VidVertexShader = require('./video/vid-primitive-nodes/vid-vertex-shader');
import VidFragmentShader = require('./video/vid-primitive-nodes/vid-fragment-shader');
import VidShaderProgram = require('./video/vid-primitive-nodes/vid-shader-program');

async function fetchWadBuffer (): Promise<ArrayBuffer>
{
  return fetch('/data/dm.wad',
  {
    headers:
    {
      'Content-Type': 'application/application/octet-stream',
      'X-Content-Type-Options': 'nosniff'
    }
  })
  .then(res => res.arrayBuffer());
}

function getPreferredCanvasSize (): { w: number, h: number }
{
  const w: number = window.innerWidth;
  const h: number = window.innerHeight;
  return (w/h <= 1.6) ? { w, h: (w/1.6)|0 } : { w: (1.6*h)|0, h };
}

// Main

(async () => {
  console.log('Fetching wad!');

  const wad = WadContent.from(await fetchWadBuffer());

  const cnv = document.getElementById('doomCanvas') as HTMLCanvasElement
  const gm = getPreferredCanvasSize();
  cnv.width = gm.w;
  cnv.height = gm.h;

  const gl = cnv.getContext('webgl2') as WebGL2RenderingContext;

  const root = new VidGroupNode([
    new VidViewportNode(),
    new VidClearNode(),
    new VidVertexShader(`
      attribute vec4 a_position;

      void main() {
        gl_Position = a_position;
      }
    `),
    new VidFragmentShader(`
      precision mediump float;

      void main() {
        gl_FragColor = vec4(1, 0, 0.5, 1);
      }
    `),
    new VidShaderProgram(),
    new VidArrayBufferNode([0, 0, 0, 0.5, 0.7, 0], 'a_position'),
    new VidCallbackNode((gl: WebGL2RenderingContext, state: VidStateStack) => gl.drawArrays(WebGL2RenderingContext.TRIANGLES, 0, 3))
  ]);
  root.render(gl, new VidStateStack());

  console.log('wad fetched!');
})()

export = {}
