import * as x from 'unhoax'
import { defaults } from '../defaults'
import type { FixtureFactory } from '../FixtureFactory'
import { max, min } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateSet =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<Set<unknown>> =>
  (chance, schema) => {
    const factory = Factory()
    const itemSchema = (schema as x.SetSchema<unknown>).item
    const minItems = min(schema)
    const maxItems = max(schema)
    const safeMin = Math.max(0, minItems ?? 0)
    const safeMax = Math.max(safeMin + 1, maxItems ?? defaults.maxSetSize)
    const generate = factory(itemSchema)
    const count = chance.integer({ min: safeMin, max: safeMax })

    return new Set(chance.n(() => generate(chance), count))
  }
