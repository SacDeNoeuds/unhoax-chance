import { defaults } from '../defaults'
import { max, min } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

const add = (target: number | undefined, n: number) => target && target + n
const isDefined = Boolean as unknown as <T>(value: T | undefined) => value is T

export const generateDate: GenerateFixtureFromSchema<Date> = (
  chance,
  schema,
) => {
  const safeMin = Math.max(
    ...[defaults.minDateValue, add(min(schema)?.valueOf(), 1)].filter(
      isDefined,
    ),
  )

  const safeMax = Math.min(
    ...[defaults.maxDateValue, add(max(schema)?.valueOf(), -1)].filter(
      isDefined,
    ),
  )
  const int = chance.integer({
    min: safeMin,
    max: Math.max(safeMin, safeMax),
  })
  return new Date(int)
}
