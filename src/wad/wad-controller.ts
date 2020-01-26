import WadView = require('./wad-view');
import WadInfo = require('./wad-info');
import WadLump = require('./wad-lump');
import WadPatch = require('./wad-patch');
import WadPalette = require('./wad-palette');
import { isNullOrUndefined } from 'util';


const _lumpMap: WeakMap<object, Map<string, WadLump>> = new WeakMap();

async function fetchWadBuffer (wadFileUrl: string): Promise<ArrayBuffer>
{
  return fetch(wadFileUrl,
  {
    headers:
    {
      'Content-Type': 'application/application/octet-stream',
      'X-Content-Type-Options': 'nosniff'
    }
  })
  .then(res => res.arrayBuffer());
}

class WadController
{
  static async from (wadFileUrl: string): Promise<WadController>
  {
    const wadBuffer = await fetchWadBuffer(wadFileUrl);
    const wadView = new WadView(wadBuffer, 0, undefined);
    const wadInfo = new WadInfo(wadView);
    const n = wadInfo.numLumps;
    const wadController = new WadController();
    const lumpMap = _lumpMap.get(wadController) as Map<string, WadLump>;

    for (let i = 0; i <n; ++i)
    {
      const lump = wadInfo.getLump(i);
      lumpMap.set(lump.name, wadInfo.getLump(i));

      console.log(`  ${lump.name}`);
    }

    return wadController;
  }

  constructor ()
  {
    console.log('WadController.constructor()');

    _lumpMap.set(this, new Map<string, WadLump>());
  }

  getLump (lumpName: string): WadLump
  {
    const lumpMap = _lumpMap.get(this) as Map<string, WadLump>;
    const lump = lumpMap.get(lumpName);

    if (isNullOrUndefined(lump))
      throw new Error(`WadLumpMap.getLump(): Failed to find lump of name ${lumpName}`);

    return lump;
  }

  getPatch (lumpName: string): WadPatch
  {
    return WadPatch.from(this.getLump(lumpName));
  }

  getPalette (lumpName: string): WadPalette
  {
    return WadPalette.from(this.getLump(lumpName));
  }
}

export = WadController;
