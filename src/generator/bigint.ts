import { max, min } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

const add = (target: number | undefined, n: number) => target && target + n

export const generateBigInt: GenerateFixtureFromSchema<bigint> = (
  chance,
  schema,
) => {
  const int = chance.integer({
    min: min(schema),
    max: max(schema),
  })
  return BigInt(int)
}
