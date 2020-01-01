import WadItem = require('./wad-item');
import WadView = require('./wad-view');
import WadPost = require('./wad-post');


export = class WadColumn extends WadItem
{
  constructor (wadView: WadView)
  {
    console.log('WadColumn.constructor()');
    super(wadView);
  }

  get posts(): WadPost
  {
    return new WadPost(this.wadView);
  }

  fillCache(x: number, width: number, height: number, cache: Uint8Array)
  {
    this.posts.fillCache(x, 0, width, height, cache);
  }
}
