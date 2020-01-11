const SCREEN_WIDTH = 320;
const SCREEN_HEIGHT = 200;

const _data = new WeakMap<object, number[]>();

const _unitData = [ 1, 0, 0,  0, 1, 0,  0, 0, 1 ];
const _toGlData = [ 2/SCREEN_WIDTH, 0, -1,  0, -2/SCREEN_HEIGHT, 1,  0, 0, 1 ];


function _mulVec (mtx: number[], vec: number[])
{
  // Rotation terms omitted
  return [
    mtx[0] * vec[0] + mtx[2],
    mtx[4] * vec[1] + mtx[5]
  ];
}

function _scaleVec (mtx: number[], vec: number[])
{
  // Rotation terms omitted
  // Traslation terms omitted
  return [
    mtx[0] * vec[0],
    -mtx[4] * vec[1]
  ];
}


class VidMatrix
{
  constructor (data: number[])
  {
    _data.set(this, data);
  }

  mulVec(vec: [number, number])
  {
    return _mulVec(_data.get(this) as number[], vec);
  }

  scaleVec(vec: [number, number])
  {
    return _scaleVec(_data.get(this) as number[], vec);
  }

  static vecToGl (vec: [number, number])
  {
    return _mulVec(_toGlData, vec);
  }

  static sizeToGl (size: [number, number])
  {
    return _scaleVec(_toGlData, size);
  }
}

export = VidMatrix;
