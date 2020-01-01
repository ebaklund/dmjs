import WadItem = require('./wad-item');
import WadView = require('./wad-view');
import WadColumn = require('./wad-column');
import WadLump = require('./wad-lump');

const _cache = new WeakMap<object, Uint8Array>();


class WadPatch extends WadItem
{
  static from (wadLump: WadLump)
  {
    return new WadPatch(wadLump.wadView.spawn(wadLump.dataOffset, undefined));
  }

  constructor (wadView: WadView)
  {
    console.log('WadPatch.constructor()');
    super(wadView);
  }

  get width (): number
  {
    return this.wadView.getInt16(0, true);
  }

  get height (): number
  {
    return this.wadView.getInt16(2, true);
  }

  get x (): number
  {
    return this.wadView.getInt16(4, true);
  }

  get y (): number
  {
    return this.wadView.getInt16(6, true);
  }

  getColumnOfs(i: number): number
  {
    return this.wadView.getInt32(8 + i * 4, true);
  }

  getColumn(i: number): WadColumn
  {
    return new WadColumn(this.wadView.spawn(this.getColumnOfs(i), undefined));
  }

  get cache (): Uint8Array
  {
    let cache = _cache.get(this);

    if (!cache)
    {
      cache = createCache(this);
      _cache.set(this, cache);
    }

    return cache;
  }

  toString (): string
  {
    return `WadPatch { x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height} }`;
  }
}

function createCache (wp: WadPatch): Uint8Array
{
  const w = wp.width;
  const h = wp.height;
  const cache = new Uint8Array(w * h);

  for (let x = 0; x < w; ++x)
    wp.getColumn(x).fillCache(x, w, h, cache);

  return cache;
}

export = WadPatch;
