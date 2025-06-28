import { x } from 'unhoax'
import { describe } from 'vitest'
import { testThatSchemaGenerates } from '../internal/test'

describe.each<[name: string, schema: x.Schema<string>]>([
  ['string', x.string],
  // ['untrimmed string', x.untrimmedString],
])('%s', (name, schema) => {
  testThatSchemaGenerates(`a random ${name}`, schema)

  testThatSchemaGenerates(
    'a string of at least 5 characters',
    schema.size({ min: 5 }),
  )

  testThatSchemaGenerates(
    'a string of 5 characters maximum',
    schema.size({ max: 5 }),
  )

  testThatSchemaGenerates(
    'a string between 5 and 20 characters',
    schema.size({ min: 5, max: 20 }),
  )

  // testSchema(
  //   schema.pattern(/[A-z]{2} [A-z]{5}/),
  //   'it a string of a certain pattern',
  // )
})
