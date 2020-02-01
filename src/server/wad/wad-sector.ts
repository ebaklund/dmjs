import WadItem = require('./wad-item');
import WadView = require('./wad-view');
import WadLump = require('./wad-lump');

const _count = new WeakMap<object, number>();

class WadSector extends WadItem
{
  static get size ()
  {
    return 26; // bytes
  }

  static from (wadView: WadView, i: number): WadSector
  {
    return new WadSector(wadView.spawnRelative(i * WadSector.size, WadSector.size));
  }

  constructor (wadView: WadView)
  {
    console.log('WadSector.constructor()');
    super(wadView);
  }

  get floorHeight (): number
  {
    return this.wadView.getInt16(0, true);
  }

  get ceilingHeight (): number
  {
    return this.wadView.getInt16(2, true);
  }

  get floorPic (): string
  {
    return this.wadView.getString(4, 8);
  }

  get ceilingPic (): string
  {
    return this.wadView.getString(12, 8);
  }

  get lightLevel (): number
  {
    return this.wadView.getInt16(20, true);
  }

  get special (): number
  {
    return this.wadView.getInt16(22, true);
  }

  get tag (): number
  {
    return this.wadView.getInt16(24, true);
  }
}

export = WadSector;
