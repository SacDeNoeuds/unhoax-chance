import { max, min } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateString: GenerateFixtureFromSchema<string> = (
  chance,
  schema,
) => {
  const minChars = min(schema)
  const maxChars = max(schema)
  const safeMin = Math.max(0, minChars ?? 0)
  const safeMax = Math.max(safeMin + 1, maxChars ?? 0)
  return chance.string({
    length:
      minChars || maxChars
        ? chance.integer({ min: safeMin, max: safeMax })
        : undefined,
  })
}
