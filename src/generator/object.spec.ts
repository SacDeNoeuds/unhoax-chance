import { fc, test } from '@fast-check/vitest'
import pipe from 'just-pipe'
import { x } from 'unhoax'
import { describe, expect } from 'vitest'
import { createFixtureFactory } from '../FixtureFactory'
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

describe('object keeps overrides', () => {
  const fixedId = 'abc'
  const itemSchema = x.object({ id: x.string, age: x.number })
  // Side-effect: registers a fixture factory for item schema.
  createFixtureFactory(itemSchema, {
    id: () => fixedId,
  })
  describe('when nested in an array', () => {
    const schema = pipe(itemSchema, x.array, x.size({ min: 1, max: 1 }))
    const createFixture = createFixtureFactory(schema)

    test.prop([fc.noShrink(fc.integer()).map(createFixture)])(
      'generates a fixed id',
      (value) => {
        expect(value[0].id).toBe(fixedId)
      },
    )
  })

  describe('when nested in another object', () => {
    const schema = x.object({ person: itemSchema })
    const createFixture = createFixtureFactory(schema)

    test.prop([fc.noShrink(fc.integer()).map(createFixture)])(
      'generates a fixed id',
      (value) => {
        expect(value.person.id).toBe(fixedId)
      },
    )
  })

  describe('when nested in a Set', () => {
    const schema = pipe(itemSchema, x.Set, x.size({ min: 1, max: 1 }))
    const createFixture = createFixtureFactory(schema)

    test.prop([fc.noShrink(fc.integer()).map(createFixture)])(
      'generates a fixed id',
      (value) => {
        expect(value.values().next().value?.id).toBe(fixedId)
      },
    )
  })

  describe('when nested in a Map', () => {
    const schema = pipe(x.Map(x.string, itemSchema), x.size({ min: 1, max: 1 }))
    const createFixture = createFixtureFactory(schema)

    test.prop([fc.noShrink(fc.integer()).map(createFixture)])(
      'generates a fixed id',
      (value) => {
        expect(value.values().next().value?.id).toBe(fixedId)
      },
    )
  })
})
