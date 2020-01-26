import WadItem = require('./wad-item');
import WadView = require('./wad-view');
import WadLump = require('./wad-lump');
import WadSector = require('./wad-sector');

const _count = new WeakMap<object, number>();
const _cache = new WeakMap<object, Int16Array>();


class WadSectors extends WadItem
{
  static from (wadLump: WadLump): WadSectors
  {
    return new WadSectors(wadLump.wadView.spawnAbsolute(wadLump.dataOffset, undefined), wadLump.size / WadSector.size);
  }

  constructor (wadView: WadView, count: number)
  {
    console.log('WadSectors.constructor()');
    super(wadView);
    _count.set(this, count);
  }

  get count (): number
  {
    return _count.get(this) as number;
  }

  getWadSector (i: number)
  {
    if (i < 0 || i >= this.count)
      throw new Error('WadSectors.getSector(): index out of range.');

    return WadSector.from(this.wadView, i);
  }
}

export = WadSectors;
