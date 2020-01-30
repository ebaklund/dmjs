const _maps = new WeakMap<object, Map<object, object>[]>();

class VidStateStack
{
  constructor ()
  {
    _maps.set(this, [new Map<object, object>()]);
  }

  push ()
  {
    (_maps.get(this) as Map<object, object>[])
      .push(new Map<object, object>());
  }

  pop ()
  {
    (_maps.get(this) as Map<object, object>[])
      .pop();
  }

  get (key: object): object | undefined
  {
    const maps = _maps.get(this) as Map<object, object>[];
    let value = undefined;

    for (let i = maps.length - 1; (value === undefined) && (i >= 0); --i)
      value = maps[i].get(key);

    return value;
  }

  set (key: object, value: object)
  {
    const maps = _maps.get(this) as Map<object, object>[];
    maps[maps.length - 1].set(key, value);
  }
}

export = VidStateStack;
