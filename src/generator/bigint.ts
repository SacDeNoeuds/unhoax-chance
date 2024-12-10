import { max, min } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

const add = (target: number | undefined, n: number) => target && target + n

export const generateBigInt: GenerateFixtureFromSchema<bigint> = (
  chance,
  schema,
) => {
  const safeMin = Math.max(0, add(min(schema), 1) ?? 0)
  const maxInt = max(schema)
  const int = chance.integer({
    min: Math.max(0, add(min(schema), 1) ?? 0),
    max: maxInt && Math.max(safeMin, maxInt - 1),
  })
  return BigInt(int)
}
