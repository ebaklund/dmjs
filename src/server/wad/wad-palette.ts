import WadItem = require('./wad-item');
import WadView = require('./wad-view');
import WadLump = require('./wad-lump');

const _cache = new WeakMap<object, Uint8Array>();


class WadPalette extends WadItem
{
  static from (wadLump: WadLump)
  {
    return new WadPalette(wadLump.wadView.spawnAbsolute(wadLump.dataOffset, undefined));
  }

  constructor (wadView: WadView)
  {
    console.log('WadPalette.constructor()');
    super(wadView);
  }

  get texData (): Uint8Array
  {
    let cache = _cache.get(this);

    if (!cache)
    {
      // Copied from wad in case modify by color enhancement happens on the cache
      const offset = this.wadView.byteOffset;
      cache = new Uint8Array(this.wadView.buffer.slice(offset, offset + 256 * 3));
      _cache.set(this, cache);
    }

    return cache;
  }
}


export = WadPalette;
