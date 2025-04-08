import pipe from 'just-pipe'
import { x } from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates('a Map<string, number>', x.Map(x.string, x.number))
testThatSchemaGenerates(
  'a Map<string, number> with size > 5',
  pipe(x.Map(x.string, x.number), x.size({ min: 5 })),
)

testThatSchemaGenerates(
  'a Map<string, number> with size < 5',
  pipe(x.Map(x.string, x.number), x.size({ max: 5 })),
)

testThatSchemaGenerates(
  'a Map<string, number> with 5 < size < 10',
  pipe(x.Map(x.string, x.number), x.size({ min: 5, max: 10 })),
)
