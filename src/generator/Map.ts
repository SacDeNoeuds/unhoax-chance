import { x } from 'unhoax'
import type { FixtureFactory } from '../FixtureFactory'
import { maxSize, minSize } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateMap =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<any> =>
  (chance, schema) => {
    const factory = Factory()
    const [key, value] = (schema as x.MapSchema<any, any>).item!.items

    const count = chance.integer({ min: minSize(schema), max: maxSize(schema) })
    const generateKey = factory(key)
    const generateValue = factory(value)
    return new Map(
      chance.n(() => [generateKey(chance), generateValue(chance)], count),
    )
  }
