import { x } from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates('array of string', x.array(x.string))

testThatSchemaGenerates(
  'an array of string of length > 5',
  x.array(x.string).size({ min: 5 }),
)

testThatSchemaGenerates(
  'an array of string of length < 20',
  x.array(x.string).size({ max: 20 }),
)

testThatSchemaGenerates(
  'an array of string of length between 5 & 20',
  x.array(x.string).size({ min: 5, max: 20 }),
)

testThatSchemaGenerates(
  'an array of length < 10 containing strings of length < 3',
  x.array(x.string.size({ max: 3 })).size({ max: 10 }),
)
