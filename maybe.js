function identity(a) {
  return a;
}

function setPrototypeOf(object, prototype) {
  function C() {
    Object.assign(this, object);
  }
  C.prototype = prototype;
  return new C();
}

const MAYBE_TYPE = {
  just: 'just',
  nothing: 'nothing'
};

const maybePrototype = Object.create(Object.prototype, {
  isJust: {
    get: function () {
      return this.__maybeType === MAYBE_TYPE.just;
    }
  },
  isNothing: {
    get: function () {
      return this.__maybeType === MAYBE_TYPE.nothing;
    }
  },
  map: {
    value: function (fn) {
      if (this.isNothing) {
        return Nothing;
      }

      return Just(fn(this.__value));
    }
  },
  match: {
    value: function ({ Nothing, Just }) {
      if (this.isNothing) {
        return Nothing();
      }
      else {
        return Just(this.__value);
      }
    }
  },
  unwrap: {
    value: function () {
      if (this.isNothing) {
        return void 0;
      }

      return this.__value;
    }
  }
});

export const Nothing = setPrototypeOf({}, maybePrototype);
Object.defineProperty(Nothing, '__maybeType', {
  value: MAYBE_TYPE.nothing
});


export function Just(value) {
  const result = setPrototypeOf({
    __value: value
  }, maybePrototype);

  Object.defineProperty(result, '__maybeType', {
    value: MAYBE_TYPE.just
  });

  return result;
};
