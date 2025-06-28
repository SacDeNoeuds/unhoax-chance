import { maxSize, minSize } from '../internal/find-in-refinements'
import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateString: GenerateFixtureFromSchema<string> = (
  chance,
  schema,
) => {
  const minChars = minSize(schema)
  const maxChars = maxSize(schema)
  const length =
    minChars || maxChars
      ? chance.integer({ min: minChars, max: maxChars })
      : undefined
  return chance.string({ length })
}
