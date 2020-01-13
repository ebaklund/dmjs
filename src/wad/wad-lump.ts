import WadItem = require('./wad-item');
import WadView = require('./wad-view');


export = class WadLump extends WadItem
{
  constructor (wadView: WadView)
  {
    //console.log('WadLump.constructor()');
    super(wadView);
  }

  static get Sizeof(): number
  {
    return 16;
  }

  get dataOffset(): number
  {
    return this.wadView.getInt32(0, true);
  }

  get data(): WadView
  {
    return this.wadView.spawnRelative(this.dataOffset, undefined);
  }

  get size(): number
  {
    return this.wadView.getInt32(4, true);
  }

  get name(): string
  {
    let length = 0;
    for (; length < 8 && this.wadView.getUint8(8 + length) > 0; ++length);

    return this.wadView.getString(8, length);
  }
}
