import { x } from 'unhoax'
import { describe, expect, it } from 'vitest'
import { createFixtureFactory } from '../FixtureFactory'
import { factories } from '../factories'
import { testThatSchemaGenerates } from '../internal/test'

type Email = string & { _tag: 'Email' }
const isEmail = (input: unknown): input is Email =>
  typeof input === 'string' && input.includes('@')
const emailSchema = x.fromGuard('Email', isEmail)

type Person = { _tag: 'Person'; email: Email; name: string; age: number }
const personSchema = x.object<Person>('Person', {
  _tag: x.literal('Person'),
  email: emailSchema,
  name: x.string,
  age: x.number,
})

testThatSchemaGenerates('a person', personSchema, {
  email: (chance) => chance.email() as Email,
})

describe('unregistered type – Email', () => {
  it.each<number>([1, 2, 3, 4, 5, 6])(
    'fails generating valid emails (seed: %s)',
    (seed) => {
      expect(() => createFixtureFactory(emailSchema)(seed)).toThrow()
    },
  )
})

describe('registered type – GlobalEmail', () => {
  const globalEmailSchema = x.fromGuard('GlobalEmail', isEmail)
  factories.GlobalEmail = (chance) => chance.email()
  testThatSchemaGenerates('a global email', globalEmailSchema)
})
