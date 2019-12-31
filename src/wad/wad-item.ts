import WadView = require('./wad-view');

const _wadView: WeakMap<object, WadView> = new WeakMap();


export = class WadItem
{
  constructor (wadView: WadView)
  {
    console.log('WadItem.constructor()');
    _wadView.set(this, wadView);
  }

  get wadView (): WadView
  {
    return _wadView.get(this) as WadView;
  }
}
