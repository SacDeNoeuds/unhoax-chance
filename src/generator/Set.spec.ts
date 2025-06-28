import { x } from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates('Set<string>', x.setOf(x.string))

testThatSchemaGenerates(
  'Set<string> size > 5',
  x.setOf(x.string).size({ min: 5 }),
)

testThatSchemaGenerates(
  'Set<string> size < 20',
  x.setOf(x.string).size({ max: 20 }),
)

testThatSchemaGenerates(
  'Set<string> size between 5 & 20',
  x.setOf(x.string).size({ min: 5, max: 20 }),
)

testThatSchemaGenerates(
  'Set<string> < 10 with string length < 3',
  x.setOf(x.string.size({ max: 3 })).size({ max: 10 }),
)
