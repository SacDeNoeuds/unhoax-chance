import type { GenerateFixtureFromSchema } from '../internal/GenerateFixtureFromSchema'

export const generateBool: GenerateFixtureFromSchema<boolean> = (chance) =>
  chance.bool()
