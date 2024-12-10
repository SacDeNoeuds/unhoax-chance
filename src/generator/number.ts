import { max, min } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

const add = (target: number | undefined, n: number) => target && target + n

export const generateFloat: GenerateFixtureFromSchema<number> = (
  chance,
  schema,
) => {
  return chance.floating({
    min: add(min(schema), 0.01),
    max: add(max(schema), -0.01),
  })
}
export const generateInteger: GenerateFixtureFromSchema<number> = (
  chance,
  schema,
) => {
  return chance.integer({
    min: add(min(schema), 1),
    max: add(max(schema), -1),
  })
}
