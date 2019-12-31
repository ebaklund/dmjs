import WadItem = require('./wad-item');
import WadView = require('./wad-view');
import WadColumn = require('./wad-column');


export = class WadPatch extends WadItem
{
  constructor (wadView: WadView)
  {
    console.log('WadPatch.constructor()');
    super(wadView);
  }

  get width (): number
  {
    return this.wadView.getInt16(0);
  }

  get height (): number
  {
    return this.wadView.getInt16(2);
  }

  get x (): number
  {
    return this.wadView.getInt16(4);
  }

  get y (): number
  {
    return this.wadView.getInt16(6);
  }

  getColumnOfs(i: number): number
  {
    return this.wadView.getInt32(8 + i * 4);
  }

  getColumn(i: number): WadColumn
  {
    return new WadColumn(this.wadView.spawn(this.getColumnOfs(i), undefined));
  }

  toString (): string
  {
    return `WadPatch { x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height} }`;
  }
}
