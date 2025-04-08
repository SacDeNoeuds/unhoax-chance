import pipe from 'just-pipe'
import { x } from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates(
  'a foo bar object',
  x.object({ foo: x.string, bar: x.number }),
)

testThatSchemaGenerates(
  'an object respecting nested constraints',
  x.object({
    foo: pipe(x.integer, x.between(2, 10)),
    bar: pipe(x.string, x.size({ max: 4 })),
  }),
)
