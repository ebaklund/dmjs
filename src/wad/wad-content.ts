import WadView = require('./wad-view');
import WadInfo = require('./wad-info');
import WadLump = require('./wad-lump');


const _lumpMap: WeakMap<object, Map<string, WadLump>> = new WeakMap();

class WadContent
{
  constructor (wadBuffer: ArrayBuffer)
  {
    console.log('WadContent.constructor()');

    const wadView = new WadView(wadBuffer, 0, undefined);
    const wadInfo = new WadInfo(wadView);
    const n = wadInfo.numLumps;
    const lumpMap = this.lumpMap;

    for (let i = 0; i <n; ++i)
    {
      const lump: WadLump = wadInfo.getLump(i);
      lumpMap.set(lump.name, lump);

      console.log(`  ${lump.name}`);
    }
  }

  get lumpMap (): Map<string, WadLump>
  {
    return _lumpMap.get(this) as Map<string, WadLump>;
  }
}

export = WadContent;
