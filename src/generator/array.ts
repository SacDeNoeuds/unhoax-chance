import { x } from 'unhoax'
import type { FixtureFactory } from '../FixtureFactory'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'
import { maxSize, minSize } from '../internal/find-in-refinements'

export const generateArray =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<unknown[]> =>
  (chance, schema) => {
    const factory = Factory()
    const itemSchema = (schema as x.ArraySchema<unknown>).item

    const generate = factory(itemSchema)
    const count = chance.integer({ min: minSize(schema), max: maxSize(schema) })

    return chance.n(() => generate(chance), count)
  }
