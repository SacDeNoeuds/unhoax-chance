import { x } from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates(
  'a Record<string, number>',
  x.record(x.string, x.number),
)

testThatSchemaGenerates(
  'a non-empty Record<string, number>',
  x
    .record(x.string, x.number)
    .refine('NonEmpty', (record) => Object.keys(record).length > 0),
)
