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

  get colors (): WadView
  {
    return this.wadView.spawn(3, this.length);
  }

  get next (): WadPost
  {
    return new WadPost(this.wadView.spawn(4 + this.length, undefined));
  }

  toString (): string
  {
    return `WadPost { topDelta: ${this.topDelta}, length: ${this.length}, isEnd: ${this.isEnd} }`;
  }
}
