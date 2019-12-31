import WadItem = require('./wad-item');
import WadView = require('./wad-view');
import WadLump = require('./wad-lump');


export = class WadInfo extends WadItem
{
  constructor (wadView: WadView)
  {
    console.log('WadInfo.constructor()');
    super(wadView);
  }

  get Identification(): string
  {
    return this.wadView.getString(0, 4); // Should be 'IWAD' or 'PWAD'.
  }

  get numLumps(): number
  {
    return this.wadView.getInt32(4);
  }

  get infotableOfs(): number
  {
    return this.wadView.getInt32(8);
  }

  getLump (i: number)
  {
    return new WadLump(this.wadView.spawn(this.infotableOfs + i * WadLump.Sizeof, undefined));
  }
}