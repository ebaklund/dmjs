const _koko = new WeakMap<object, number>();
class DummyClass {
  constructor () {
    _koko.set(this, 0);
  }
}

export = DummyClass;
