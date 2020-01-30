import WadItem = require('./wad-item');
import WadView = require('./wad-view');
import WadLump = require('./wad-lump');

const _count = new WeakMap<object, number>();


class WadBlockmap extends WadItem
{
  static from (wadLump: WadLump)
  {
    return new WadBlockmap(wadLump.wadView.spawnAbsolute(wadLump.dataOffset, undefined), wadLump.size / 2);
  }

  constructor (wadView: WadView, count: number)
  {
    console.log('WadBlockmap.constructor()');
    super(wadView);
    _count.set(this, count);
  }

  get x (): number
  {
    return this.wadView.getInt16(0, true);
  }

  get y (): number
  {
    return this.wadView.getInt16(2, true);
  }

  get width (): number
  {
    return this.wadView.getInt16(4, true);
  }

  get height (): number
  {
    return this.wadView.getInt16(6, true);
  }

  get count (): number
  {
    return _count.get(this) as number;
  }
}

export = WadBlockmap;
