import {test} from 'babel-tap';

import {Just, Nothing} from './maybe';

test('maybe Just', t => {
  t.plan(3);

  const wrappedValue = 1;
  const result = Just(wrappedValue);

  t.ok(result.isJust);
  t.ok(!result.isNothing);
  t.equals(result.unwrap(), 1);
});
