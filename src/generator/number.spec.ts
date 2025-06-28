import { x } from 'unhoax'
import { describe } from 'vitest'
import { testThatSchemaGenerates } from '../internal/test'

describe.each<[name: string, x.Schema<number>]>([
  ['integer', x.integer],
  ['number', x.number],
  ['unsafeInteger', x.unsafeInteger],
  ['unsafeNumber', x.unsafeNumber],
])('%s', (_, schema) => {
  testThatSchemaGenerates(`a random ${schema.name}`, schema)
  testThatSchemaGenerates(`a number < 1`, schema.max(1))
  testThatSchemaGenerates('a number > 1', schema.min(1))
  testThatSchemaGenerates(
    'a number between -10 and 10',
    schema.min(-10).max(10),
  )
})
