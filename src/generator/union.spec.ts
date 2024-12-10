import * as x from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates(
  'a union of anything',
  x.union(
    x.number,
    x.string,
    x.boolean,
    x.literal(undefined),
    x.literal(null),
    x.date,
    x.object({ name: x.string }),
    x.array(x.object({ age: x.number })),
  ),
)

testThatSchemaGenerates(
  'a variant union',
  x.variant('type', [
    x.object({ type: x.literal('foo'), text: x.string }),
    x.object({ type: x.literal('bar'), n: x.number }),
  ]),
)
