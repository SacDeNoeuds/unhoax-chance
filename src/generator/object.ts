import { x } from 'unhoax'
import type { FixtureFactory } from '../FixtureFactory'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

type T = Record<string, unknown>
export const generateObject =
  (Factory: () => FixtureFactory): GenerateFixtureFromSchema<T> =>
  (chance, schema) => {
    const factory = Factory()
    const { props } = schema as x.ObjectSchema<T>
    const copy = {} as T
    for (const key in props) {
      copy[key] = factory(props[key])(chance)
    }
    return copy
  }
