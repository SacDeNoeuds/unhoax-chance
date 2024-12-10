import * as x from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates(
  'a literal',
  x.literal('foo', 'bar', 42, undefined, null, true, false),
)
