import pipe from 'just-pipe'
import { x } from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates('Set<string>', x.Set(x.string))

testThatSchemaGenerates(
  'Set<string> size > 5',
  pipe(x.string, x.Set, x.size({ min: 5 })),
)

testThatSchemaGenerates(
  'Set<string> size < 20',
  pipe(x.string, x.Set, x.size({ max: 20 })),
)

testThatSchemaGenerates(
  'Set<string> size between 5 & 20',
  pipe(x.string, x.Set, x.size({ min: 5, max: 20 })),
)

testThatSchemaGenerates(
  'Set<string> < 10 with string length < 3',
  pipe(x.string, x.size({ max: 3 }), x.Set, x.size({ max: 10 })),
)
