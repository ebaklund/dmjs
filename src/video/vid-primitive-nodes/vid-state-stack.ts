const _maps = new WeakMap<object, Map<string, object>[]>();

class VidStateStack
{
  constructor ()
  {
    _maps.set(this, []);
  }

  push ()
  {
    (_maps.get(this) as Map<string, object>[])
      .push(new Map<string, object>());
  }

  pop ()
  {
    (_maps.get(this) as Map<string, object>[])
      .pop();
  }

  get (key: string)
  {
    const maps = _maps.get(this) as Map<string, object>[];
    let value = undefined;

    for (let i = maps.length - 1; (value === undefined) && (i >= 0); --i)
      value = maps[i].get(key);

    return value;
  }

  set (key: string, value: object)
  {
    const maps = _maps.get(this) as Map<string, object>[];
    maps[maps.length - 1].set(key, value);
  }
}

export = VidStateStack;
