import WadView = require('./wad-view');
import WadInfo = require('./wad-info');
import WadLump = require('./wad-lump');
import { isNullOrUndefined } from 'util';


const _lumpMap: WeakMap<object, Map<string, WadLump>> = new WeakMap();

class WadLumpMap
{
  static from (wadBuffer: ArrayBuffer): WadLumpMap
  {
    const wadView = new WadView(wadBuffer, 0, undefined);
    const wadInfo = new WadInfo(wadView);
    const n = wadInfo.numLumps;
    const wadLumpMap = new WadLumpMap();
    const lumpMap = _lumpMap.get(wadLumpMap) as Map<string, WadLump>;

    for (let i = 0; i <n; ++i)
    {
      const lump = wadInfo.getLump(i);
      lumpMap.set(lump.name, wadInfo.getLump(i));

      console.log(`  ${lump.name}`);
    }

    return wadLumpMap;
  }

  constructor ()
  {
    console.log('WadContent.constructor()');

    _lumpMap.set(this, new Map<string, WadLump>());
  }

  getLump(lumpName: string): WadLump
  {
    const lumpMap = _lumpMap.get(this) as Map<string, WadLump>;
    const lump = lumpMap.get(lumpName);

    if (isNullOrUndefined(lump))
      throw new Error(`WadLumpMap.getLump(): Failed to find lump of name ${lumpName}`);

    return lump;
  }
}

export = WadLumpMap;
