
const _textDecoder: TextDecoder = new TextDecoder();


export = class WadView extends DataView
{
  constructor (arrayBuffer: ArrayBuffer, offset: number, length: number | undefined)
  {
    //console.log('WadView.constructor()');
    super(arrayBuffer, offset, length);
  }

  spawnRelative (offset: number, length: number | undefined): WadView
  {
    return new WadView(this.buffer, this.byteOffset + offset, length);
  }

  spawnAbsolute (position: number, length: number | undefined): WadView
  {
    return new WadView(this.buffer, position, length);
  }

  getString(textOffset: number, textLength: number): string
  {
    return _textDecoder.decode(this.spawnRelative(textOffset, textLength));
  }
}
