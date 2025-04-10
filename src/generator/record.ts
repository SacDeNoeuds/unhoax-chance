import { x } from 'unhoax'
import { defaults } from '../defaults'
import type { FixtureFactory } from '../FixtureFactory'
import { max, min } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateRecord =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<any> =>
  (chance, schema) => {
    const factory = Factory()
    const { key, value } = schema as x.RecordSchema<any, any>

    const minItems = min(schema)
    const maxItems = max(schema)
    const safeMin = Math.max(0, minItems ?? 0)
    const safeMax = Math.max(safeMin + 1, maxItems ?? defaults.maxRecordSize)

    const count = chance.integer({ min: safeMin, max: safeMax })
    const generateKey = factory(key)
    const generateValue = factory(value)
    return Object.fromEntries(
      chance.n(() => [generateKey(chance), generateValue(chance)], count),
    )
  }
