import type { x } from 'unhoax'
import type { FixtureFactory } from '../FixtureFactory'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateUnion =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<any> =>
  (chance, schema) => {
    const factory = Factory()
    const schemas = schema.meta!.union.schemas! as x.BaseSchema<any>[]
    const randomSchema = chance.pickone(schemas)
    return factory(randomSchema)(chance)
  }
