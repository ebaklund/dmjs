const chai = require('chai');

const VidMatrix = require('../../dest/js/video/vid-matrix');

const expect = chai.expect;
const given = describe;
const when = describe;

describe ('vid-matrix', () => {
  given('a VidMatrix', () => {
    when('transforming wad points to clip coordinates', () => {
      [
        [ '(top, left)', [0, 0], [-1, 1] ],
        [ '(top, right)', [320, 0], [1, 1] ],
        [ '(bot, left)', [0, 200], [-1, -1] ],
        [ '(bot, right)', [320, 200], [1, -1] ],
      ].forEach(ctx => {
        it (`transforms ${ctx[0]}`, () => {
          const [ x, y ] = VidMatrix.vecToGl(ctx[1]);
          expect(x).to.equal(ctx[2][0]);
          expect(y).to.equal(ctx[2][1]);
        });
      });
    });

    when('transforming wad sizes to clip coordinates', () => {
      [
        [ '(null size)', [0, 0], [0, 0] ],
        [ '(window size)', [320, 200], [2, 2] ],
      ].forEach(ctx => {
        it (`transforms ${ctx[0]}`, () => {
          const [ w, h ] = VidMatrix.sizeToGl(ctx[1]);
          expect(w).to.equal(ctx[2][0]);
          expect(h).to.equal(ctx[2][1]);
        });
      });
    });
  })
});