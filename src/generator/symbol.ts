import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateSymbol: GenerateFixtureFromSchema<symbol> = (
  chance,
  schema,
) => Symbol(schema.name)
