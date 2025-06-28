import { x } from 'unhoax'
import type { FixtureFactory } from '../FixtureFactory'
import { maxSize, minSize } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateSet =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<Set<unknown>> =>
  (chance, schema) => {
    const factory = Factory()
    const itemSchema = (schema as x.SetSchema<unknown>).item
    const generate = factory(itemSchema)
    const count = chance.integer({ min: minSize(schema), max: maxSize(schema) })

    return new Set(chance.n(() => generate(chance), count))
  }
