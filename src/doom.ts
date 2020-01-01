import WadContent = require('./wad/wad-content');
import GlRenderer = require('./video/gl-renderer');


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

function getPreferredGeometry (): { w: number, h: number }
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
  const gm = getPreferredGeometry();
  cnv.width = gm.w;
  cnv.height = gm.h;
  const renderer = GlRenderer.from(cnv);

  console.log('wad fetched!');
})()

export = {}
