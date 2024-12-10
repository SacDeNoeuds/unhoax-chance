import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateLiteral: GenerateFixtureFromSchema<unknown> = (
  chance,
  schema,
) => {
  const literals = 'literals' in schema ? (schema.literals as unknown[]) : []
  if (literals.length === 0)
    throw new Error(`no literal to generate (empty list)`)

  return chance.pickone(literals)
}
