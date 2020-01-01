import WadItem = require('./wad-item');
import WadView = require('./wad-view');

export = class WadPost extends WadItem
{
  constructor (wadView: WadView)
  {
    console.log('WadPost.constructor()');
    super(wadView);
  }

  get topDelta (): number
  {
    return this.wadView.getInt8(0);
  }

  get length (): number
  {
    return this.wadView.getInt8(1);
  }

  get isEnd (): boolean
  {
    return this.topDelta === 0xFF;
  }

  get colors (): Uint8Array
  {
    return new Uint8Array(this.wadView.buffer, this.wadView.byteOffset + 3, this.length);
  }

  get next (): WadPost
  {
    return new WadPost(this.wadView.spawn(4 + this.length, undefined));
  }

  fillCache(x: number, y: number, width: number, height: number, cache: Uint8Array)
  {
    if (this.isEnd)
      return;

    const n = this.length;
    const colors = this.colors;
    let i = 0;
    let j = (y - 1) * width + x;

    while (i < n)
      cache[j += width] = colors[i++];

    this.next.fillCache(x, y + n, width, height, cache);
  }


  toString (): string
  {
    return `WadPost { topDelta: ${this.topDelta}, length: ${this.length}, isEnd: ${this.isEnd} }`;
  }
}
