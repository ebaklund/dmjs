import WadItem = require('./wad-item');
import WadView = require('./wad-view');
import WadLump = require('./wad-lump');

const _count = new WeakMap<object, number>();
const _cache = new WeakMap<object, Int16Array>();


class WadVertices extends WadItem
{
  static from (wadLump: WadLump): WadVertices
  {
    return new WadVertices(wadLump.wadView.spawnAbsolute(wadLump.dataOffset, undefined), wadLump.size / (2*2));
  }

  constructor (wadView: WadView, count: number)
  {
    console.log('WadVertices.constructor()');
    super(wadView);
    _count.set(this, count);
  }

  get count (): number
  {
    return _count.get(this) as number;
  }

  get cache () : Int16Array
  {
    let cache = _cache.get(this);

    if (cache === undefined)
    {
      cache = new Int16Array(this.wadView.buffer, this.wadView.byteOffset, _count.get(this) as number);
      _cache.set(this, cache);
    }

    return cache;
  }
}

export = WadVertices;
