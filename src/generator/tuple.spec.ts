import { x } from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates(
  'a tuple',
  x.tuple(
    x.string,
    x.number,
    x.object({ name: x.string }),
    x.array(x.boolean),
    x.mapOf(x.string, x.number),
    x.setOf(x.integer),
  ),
)
