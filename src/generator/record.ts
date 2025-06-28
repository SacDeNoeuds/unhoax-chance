import { x } from 'unhoax'
import { defaults } from '../defaults'
import type { FixtureFactory } from '../FixtureFactory'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateRecord =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<any> =>
  (chance, schema) => {
    const factory = Factory()
    const { key, value } = schema as x.RecordSchema<any, any>

    const count = chance.integer({ min: 0, max: defaults.maxRecordSize })
    const generateKey = factory(key)
    const generateValue = factory(value)
    return Object.fromEntries(
      chance.n(() => [generateKey(chance), generateValue(chance)], count),
    )
  }
