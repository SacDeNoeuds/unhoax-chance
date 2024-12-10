import { fc, test } from '@fast-check/vitest'
import { Chance } from 'chance'
import * as x from 'unhoax'
import { expect } from 'vitest'
import { createFixtureFactory, type Overrides } from '../main'

const seeded = <T>(fn: (seed: number) => T) => fc.noShrink(fc.integer()).map(fn)

export const testThatSchemaGenerates = <T>(
  testName: string,
  schema: x.Schema<T>,
  overrides?: Overrides<T>,
) => {
  const generateFixture = createFixtureFactory(schema, overrides)
  test.prop([seeded((seed) => generateFixture(new Chance(seed)))])(
    `schema ${schema.name} generates ${testName}`,
    (value) => {
      expect(schema.parse(value).success).toBe(true)
    },
  )
}
