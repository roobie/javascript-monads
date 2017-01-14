import assert from 'assert';
import identity from './identity';
import { setPrototypeOf } from './prototypes';
import { isFunction } from './is';

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
    value: function ({ Nothing, Just } = {}) {
      // we require that Nothing is a function
      assert(isFunction(Nothing), '{Nothing} must be a function');
      if (this.isNothing) {
        return Nothing();
      }
      else if (isFunction(Just)) {
        return Just(this.__value);
      }
      else {
        return this.__value;
      }
    }
  },
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
