import WadContent = require('./wad/wad-content');

console.log('index.js');

(async () => {
  console.log('Fetching wad!');

  const res: Response = await fetch('/data/dm.wad', {
    headers: {
      'Content-Type': 'application/application/octet-stream',
      'X-Content-Type-Options': 'nosniff'
    }
  });

  const wad: WadContent = WadContent.from(await res.arrayBuffer());

  console.log('wad fetched!');
})()

export = {}
