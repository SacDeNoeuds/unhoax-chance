import pipe from 'just-pipe'
import * as x from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates(
  'a Record<string, number>',
  x.record(x.string, x.number),
)

testThatSchemaGenerates(
  'a non-empty Record<string, number>',
  pipe(
    x.record(x.string, x.number),
    x.refine('NonEmpty', (record) => Object.keys(record).length > 0),
  ),
)
