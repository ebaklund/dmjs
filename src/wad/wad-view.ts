
const _textDecoder: TextDecoder = new TextDecoder();


export = class WadView extends DataView
{
  constructor (arrayBuffer: ArrayBuffer, offset: number, length: number | undefined)
  {
    //console.log('WadView.constructor()');
    super(arrayBuffer, offset, length);
  }

  spawn (offset: number, length: number | undefined): WadView
  {
    return new WadView(this.buffer, this.byteOffset + offset, length);
  }

  getString(textOffset: number, textLength: number): string
  {
    return _textDecoder.decode(this.spawn(textOffset, textLength));
  }
}
