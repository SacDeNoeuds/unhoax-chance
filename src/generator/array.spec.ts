import pipe from 'just-pipe'
import * as x from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates('array of string', x.array(x.string))

testThatSchemaGenerates(
  'an array of string of length > 5',
  pipe(x.string, x.array, x.size({ min: 5 })),
)

testThatSchemaGenerates(
  'an array of string of length < 20',
  pipe(x.string, x.array, x.size({ max: 20 })),
)

testThatSchemaGenerates(
  'an array of string of length between 5 & 20',
  pipe(x.string, x.array, x.size({ min: 5, max: 20 })),
)

testThatSchemaGenerates(
  'an array of length < 10 containing strings of length < 3',
  pipe(x.string, x.size({ max: 3 }), x.array, x.size({ max: 10 })),
)
