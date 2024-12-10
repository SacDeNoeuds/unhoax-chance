import * as x from 'unhoax'
import { defaults } from '../defaults'
import type { FixtureFactory } from '../FixtureFactory'
import { max, min } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateArray =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<unknown[]> =>
  (chance, schema) => {
    const factory = Factory()
    const itemSchema = (schema as x.ArraySchema<unknown>).item
    const minItems = min(schema)
    const maxItems = max(schema)
    const safeMin = Math.max(0, minItems ?? 0)
    const safeMax = Math.max(safeMin + 1, maxItems ?? defaults.maxArraySize)
    const generate = factory(itemSchema)
    const count = chance.integer({ min: safeMin, max: safeMax })

    return chance.n(() => generate(chance), count)
  }
