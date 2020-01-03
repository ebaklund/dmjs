import WadContent = require('./wad/wad-content');
import VidGroupNode = require('./video/vid-primitive-nodes/vid-group-node');
import VidCallbackNode = require('./video/vid-primitive-nodes/vid-callback-node');
import VidSeparatorNode = require('./video/vid-primitive-nodes/vid-separator-node');
import VidStateStack = require('./video/vid-primitive-nodes/vid-state-stack');
import VidClearNode = require('./video/vid-primitive-nodes/vid-clear-node');

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
    new VidClearNode(),
    new VidCallbackNode(() => console.log('XXX')),
    new VidSeparatorNode([
      new VidCallbackNode(() => console.log('YYY')),
    ])
  ]);
  root.render(gl, new VidStateStack());

  console.log('wad fetched!');
})()

export = {}
