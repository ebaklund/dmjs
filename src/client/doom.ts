import WadController = require('../server/wad/wad-controller');
import VidController = require('./video/vid-controller');
import GameController = require('./game/game-controller');

function updateCanvasSize (cnv: HTMLCanvasElement)
{
  console.log('updateCanvasSize()');

  const fse = document.fullscreenElement;
  const a: number = 3.0 / 4.0; // pixel aspect correction
  const w: number = fse ? fse.clientWidth : window.innerWidth;
  const h: number = fse ? fse.clientHeight : window.innerHeight;
  const size = (w/h <= 1.6) ? { width: w, height: (w/1.6)|0 } : { width: (1.6*h)|0, height: h };
  cnv.width = size.width * a;
  cnv.height = size.height;
};

(async () => {
  const cnv = document.getElementById('doomCanvas') as HTMLCanvasElement;
  const gl = cnv.getContext('webgl2') as WebGL2RenderingContext;

  document.addEventListener("fullscreenchange", () => updateCanvasSize(cnv), false);
  updateCanvasSize(cnv);

  const wadController = await WadController.from('/data/dm.wad');
  const vidController = VidController.from(gl);

  (new GameController(wadController, vidController))
    .runMain();
})()

export = {}
