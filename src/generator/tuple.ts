import { x } from 'unhoax'
import type { FixtureFactory } from '../FixtureFactory'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateTuple =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<any[]> =>
  (chance, schema) => {
    const factory = Factory()
    const { items } = schema as unknown as x.TupleSchema<any>
    return Object.values(items).map((item) => factory(item)(chance))
  }
