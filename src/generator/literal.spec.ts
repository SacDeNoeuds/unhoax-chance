import { Chance } from 'chance'
import * as x from 'unhoax'
import { expect, it } from 'vitest'
import { testThatSchemaGenerates } from '../internal/test'
import { generateLiteral } from './literal'

testThatSchemaGenerates(
  'a literal',
  x.literal('foo', 'bar', 42, undefined, null, true, false),
)

it('throws when literal is empty', () => {
  // @ts-ignore
  expect(() => generateLiteral(new Chance(0), {})).toThrow()
})
