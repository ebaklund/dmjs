import WadView = require('./wad-view');
import WadInfo = require('./wad-info');
import WadLump = require('./wad-lump');


const _lumpMap: WeakMap<object, Map<string, WadLump>> = new WeakMap();

class WadContent
{
  static from (wadBuffer: ArrayBuffer): WadContent
  {
    const wadView = new WadView(wadBuffer, 0, undefined);
    const wadInfo = new WadInfo(wadView);
    const n = wadInfo.numLumps;
    const wadContent = new WadContent();

    for (let i = 0; i <n; ++i)
    {
      const lump: WadLump = wadInfo.getLump(i);
      wadContent.lumpMap.set(lump.name, lump);

      console.log(`  ${lump.name}`);
    }

    return wadContent;
  }

  constructor ()
  {
    console.log('WadContent.constructor()');

    _lumpMap.set(this, new Map<string, WadLump>());
  }

  get lumpMap (): Map<string, WadLump>
  {
    return _lumpMap.get(this) as Map<string, WadLump>;
  }
}

export = WadContent;
