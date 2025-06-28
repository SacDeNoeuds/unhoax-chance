import { x } from 'unhoax'

/** @internal */
export type GenerateFixtureFromSchema<T> = (
  chance: Chance.Chance,
  schema: x.BaseSchema<T>,
) => T
