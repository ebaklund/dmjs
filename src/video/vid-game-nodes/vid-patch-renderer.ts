import VidShaderProgram = require('../vid-primitive-nodes/vid-shader-program');


const _vertexShaderSource = `
  attribute vec2 a_geo_coord;
  attribute vec2 a_tex_coord;

  uniform mat3 u_geo_mtx;
  uniform mat3 u_tex_mtx;

  varying vec2 v_tex_coord;

  void main() {
    v_tex_coord = u_tex_mtx * a_tex_coord;
    gl_Position = u_geo_mtx * a_geo_coord;
  }
`;

const _fragmentShaderSource = `
  precision mediump float;

  varying vec2 v_tex_coord;

  void main() {
    float c = texture( color_tex, tex_coord ).x;
    gl_FragColor = texture( palette_tex, c);
  }
`;

/*
class VidPatchRenderer extends VidShaderProgram
{
  constructor (x: number, y: number, width: number, height: number, data: Uint8Array)
  {

    super(_vertexShaderSource, _fragmentShaderSource);
    this.children = [
      new VidGeometricCoordinates(),
      new VidTextureCoordinates(),
      new VidTransform(),
    ];

  }
}
export = VidPatchRenderer;
*/
