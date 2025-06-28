import { max, min } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateFloat: GenerateFixtureFromSchema<number> = (
  chance,
  schema,
) => {
  return chance.floating({
    min: min(schema),
    max: max(schema),
  })
}
export const generateInteger: GenerateFixtureFromSchema<number> = (
  chance,
  schema,
) => {
  return chance.integer({
    min: min(schema),
    max: max(schema),
  })
}
