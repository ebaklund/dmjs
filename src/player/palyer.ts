const _viewz = new WeakMap<object, number>();


class Player
{
  constructor ()
  {
    _viewz.set(this, 1);
  }

}

export = Player;
