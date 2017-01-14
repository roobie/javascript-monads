import assert from 'assert';
import { isFunction } from './is';

const maybePrototype = Object.create(Object.prototype, {
  /**
   * @this Maybe a
   * @signature (a -> b) -> Maybe b
   */
  map: {
    value: function (fn) {
      if (this.isNothing) {
        return Nothing;
      }

      return Just(fn(this.__value));
    }
  },
  /**
   * @this Maybe a
   * @signature { Just: (a -> b), Nothing: (nil -> b) } -> b
   */
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

export const Nothing = Object.create(maybePrototype, {
  isNothing: { value: true },
  isJust: { value: false }
});

export function Just(value) {
  return Object.create(maybePrototype, {
    isNothing: { value: false },
    isJust: { value: true },
    __value: {
      value: value
    }
  });
};
