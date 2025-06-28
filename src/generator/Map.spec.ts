import { x } from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates('a Map<string, number>', x.mapOf(x.string, x.number))
testThatSchemaGenerates(
  'a Map<string, number> with size > 5',
  x.mapOf(x.string, x.number).size({ min: 5 }),
)

testThatSchemaGenerates(
  'a Map<string, number> with size < 5',
  x.mapOf(x.string, x.number).size({ max: 5 }),
)

testThatSchemaGenerates(
  'a Map<string, number> with 5 < size < 10',
  x.mapOf(x.string, x.number).size({ min: 5, max: 10 }),
)
