import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateLiteral: GenerateFixtureFromSchema<unknown> = (
  chance,
  schema,
) => {
  const literals = schema.meta!.literal.literals as any[]
  if (literals.length === 0)
    throw new Error(`no literal to generate (empty list)`)

  return chance.pickone(literals)
}
