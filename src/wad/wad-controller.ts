import WadView = require('./wad-view');
import WadInfo = require('./wad-info');
import WadLump = require('./wad-lump');
import WadPatch = require('./wad-patch');
import WadPalette = require('./wad-palette');
import WadBlockmap = require('./wad-blockmap');
import { isNullOrUndefined } from 'util';


const _wadInfo: WeakMap<object, WadInfo> = new WeakMap();
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
    const lumpMap = new Map<string, WadLump>();

    for (let i = 0, n = wadInfo.numLumps; i <n; ++i)
    {
      const lump = wadInfo.getLump(i);
      lumpMap.set(lump.name, wadInfo.getLump(i));

      console.log(`  ${lump.name}`);
    }

    return new WadController(wadInfo, lumpMap);
  }

  constructor (wadInfo: WadInfo, lumpMap: Map<string, WadLump>)
  {
    console.log('WadController.constructor()');

    _wadInfo.set(this, wadInfo);
    _lumpMap.set(this, lumpMap);
  }

  getLumpByName (lumpName: string): WadLump
  {
    const lumpMap = _lumpMap.get(this) as Map<string, WadLump>;
    const lump = lumpMap.get(lumpName);

    if (isNullOrUndefined(lump))
      throw new Error(`WadLumpMap.getLumpByName(): Failed to find lump of name ${lumpName}`);

    return lump;
  }

  getLumpByNumber(lumpNo: number): WadLump
  {
    const wadInfo = _wadInfo.get(this) as WadInfo;

    if (lumpNo < 0 || lumpNo >= wadInfo.numLumps)
      throw new Error(`WadLumpMap.getLumpByNumber(): Lump number is out of range ${lumpNo}`);

    return wadInfo.getLump(lumpNo);
  }

  getPatch (lumpName: string): WadPatch
  {
    return WadPatch.from(this.getLumpByName(lumpName));
  }

  getPalette (lumpName: string): WadPalette
  {
    return WadPalette.from(this.getLumpByName(lumpName));
  }

  getBlockmap (lumpNo: number): WadBlockmap
  {
    return WadBlockmap.from(this.getLumpByNumber(lumpNo));
  }
}

export = WadController;
