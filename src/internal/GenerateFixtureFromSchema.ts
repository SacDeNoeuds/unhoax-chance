import * as x from 'unhoax'

/** @internal */
export type GenerateFixtureFromSchema<T> = (
  chance: Chance.Chance,
  schema: x.Schema<T>,
) => T
