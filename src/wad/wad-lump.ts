import WadItem = require('./wad-item');
import WadView = require('./wad-view');


export = class WadLump extends WadItem
{
  constructor (wadView: WadView)
  {
    super(wadView);
  }

  static get Sizeof(): number
  {
    return 16;
  }

  get dataOffset(): number
  {
    console.log('WadLump.constructor()');
    return this.wadView.getInt32(0);
  }

  get data(): WadView
  {
    return this.wadView.spawn(this.dataOffset, undefined);
  }

  get size(): number
  {
    return this.wadView.getInt32(4);
  }

  get name(): string
  {
    return this.wadView.getString(8, 8);
  }
}
