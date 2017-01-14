import {test} from 'babel-tap';

import {Just, Nothing} from '../src/maybe';

const defaultMatchPattern = {
  Nothing: () => 0
};

test('maybe::Just', t => {
  t.plan(3);

  const wrappedValue = 1;
  const result = Just(wrappedValue);

  t.ok(result.isJust);
  t.ok(!result.isNothing);
  t.equals(result.match(defaultMatchPattern), 1);
});

test('maybe::Nothing', t => {
  t.plan(2);
  const result = Nothing;

  t.ok(!result.isJust);
  t.ok(result.isNothing);
});

test('maybe::match - Just', t => {
  t.plan(2);
  const result = Just(1);

  // default match
  t.equals(result.match(defaultMatchPattern), 1);

  // explicit match
  t.equals(result.match({
    Nothing: () => 0,
    Just: v => 2
  }), 2);
});

test('maybe::match - Nothing', t => {
  t.plan(1);
  const result = Nothing;
  t.equals(result.match({Nothing: () => 999}), 999);
});

test('maybe::map - Just', t => {
  t.plan(1);

  const result = Just(1);
  t.equals(result.map(n => n + 1).match(defaultMatchPattern), 2);
});

test('maybe::map - Just', t => {
  t.plan(1);

  const result = Nothing;
  t.equals(result.map(n => n + 1).match(defaultMatchPattern), 0);
});
