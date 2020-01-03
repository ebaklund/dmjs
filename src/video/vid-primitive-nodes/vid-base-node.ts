import VidStateStack = require('./vid-state-stack');


type VidBaseNode =
{
  render(gl: WebGL2RenderingContext, state: VidStateStack): Promise<void>;
};

export = VidBaseNode;
