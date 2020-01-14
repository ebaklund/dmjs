import WadLumpMap = require('./wad/wad-lump-map');
import WadPatch = require('./wad/wad-patch');
import WadPalette = require('./wad/wad-palette');
import VidGroupNode = require('./video/vid-primitive-nodes/vid-group-node');
import VidClearNode = require('./video/vid-primitive-nodes/vid-clear-node');
import VidViewportNode = require('./video/vid-primitive-nodes/vid-viewport-node');
import VidStateStack = require('./video/vid-primitive-nodes/vid-state-stack');

import VidPatchNode = require('./video/vid-game-nodes/vid-patch-node');


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

  const wadLumpMap = WadLumpMap.from(await fetchWadBuffer());

  const cnv = document.getElementById('doomCanvas') as HTMLCanvasElement
  const gm = getPreferredCanvasSize();
  cnv.width = gm.w;
  cnv.height = gm.h;

  let lump;

  lump = wadLumpMap.getLump('TITLEPIC');
  const patch = WadPatch.from(lump);

  lump = wadLumpMap.getLump('PLAYPAL');
  const palette = WadPalette.from(lump);

  const gl = cnv.getContext('webgl2') as WebGL2RenderingContext;

  const root = new VidGroupNode([
    new VidViewportNode(),
    new VidClearNode([0.5, 0.5, 0.5, 1.0]),
    new VidPatchNode(patch, palette)
  ]);

  root.render(gl, new VidStateStack());

  console.log('wad fetched!');
})()

export = {}
