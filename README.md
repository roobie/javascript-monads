## Monads in javascript

### Maybe

In the example below, we define a module `dom.js`, that exposes
functions for operating on the DOM. This is a typical area where
`null`s and `undefined`s occur, and as such is a plausible application
of the `maybe` monad.

```javascript
// module dom.js
import {Nothing, Just} from 'monads';

/**
 * Consumes a DOM-selector string, and returns a `Maybe DOMElement`
 */
export function getElement(selector) {
  // use the built in function to try to get the DOMElement
  // matching the selector parameter
  const elt = document.querySelector(selector);
  
  if (elt) {
    // if `elt` is not "falsy", we wrap the value in Just
    return Just(elt);
  }

  // otherwise, we just return Nothing, to imply that there was no
  // match for the selector.
  return Nothing;
};
```

```javascript
// module app.js
import {getElement} from './dom';

// we want to get the element with id="some-id",
// and extract it's title. But if there is no element with that id,
// the maybe monad forces us to handle that case.
const title = getElement('#some-id')
  .map(element => element.title)
  .match({
    Nothing: () => 'Default title',
    Just: title => title + '!'
  });
```

### TODO

- Perhaps one could implement an "auto-wrapper", that accepts an object, iterates over its properties, and for each function, wraps that function in something like:
```javascript
const old<fnName> = object.<fnName>;
object.<fnName> = function (...args) {
  const result = old<fnName>.apply(this, args);
  if (result === null || result === undefined) {
    return Nothing;
  }
  
  return Just(result);
};
```
