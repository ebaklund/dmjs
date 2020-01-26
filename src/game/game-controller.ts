import WadController = require('../wad/wad-controller');
import VidController = require('../video/vid-controller');

enum GameState {
  GS_LEVEL,
  GS_INTERMISSION,
  GS_FINALE,
  GS_DEMOSCREEN
}

const _gl = new WeakMap<object, WebGL2RenderingContext>();
const _wadController = new WeakMap<object, WadController>();
const _vidController = new WeakMap<object, VidController>();
const _gameState = new WeakMap<object, GameState>();


class GameController
{
  constructor (wadController: WadController, vidController: VidController)
  {
    _wadController.set(this, wadController);
    _vidController.set(this, vidController);
    _gameState.set(this, GameState.GS_DEMOSCREEN);
  }

  async runMain ()
  {
    console.log('Game.main()');

    await runLoop(this);
  }
}

async function runLoop (self: GameController)
{
  console.log('Game.runLoop()');

  let pastSec = Date.now() / 1000;

  for (let i = 0; i < 1; ++i)
  {
    const nowSec = Date.now() / 1000;
    await runFrame(self, nowSec);
    await new Promise(resolve => setTimeout(resolve, 200));
    pastSec = nowSec;
  }
}

async function runFrame (self: GameController, nowSec: number)
{
  console.log('Game.runFrame()');

  await updateDisplay(self, nowSec);
}

async function updateDisplay (self: GameController, nowSec: number)
{
  console.log('Game.updateDisplay()');

  let pageNames = [ 'TITLEPIC', 'CREDIT '];

  const vidController = _vidController.get(self) as VidController;

  switch (_gameState.get(self))
  {
  case GameState.GS_DEMOSCREEN:
    await drawPageFromPatch(self, pageNames[0]);
    break;
  }
}

async function drawPageFromPatch (self: GameController, pageName: string)
{
  // credit
  console.log('Game.drawPage()');

  const wadController = _wadController.get(self) as WadController;
  const patch = wadController.getPatch('TITLEPIC');
  const palette = wadController.getPalette('PLAYPAL');

  const vidController = _vidController.get(self) as VidController;
  await vidController.drawPageFromPatch('TITLEPIC', patch, palette);
}


export = GameController;
