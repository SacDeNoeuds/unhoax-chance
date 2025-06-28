import { Chance } from 'chance'
import { x } from 'unhoax'
import { factories } from './factories'
import type { GenerateFixtureFromSchema } from './internal/GenerateFixtureFromSchema'

/** @internal Fixture Factory */
export type FixtureFactory = typeof createFixtureFactory

/** @category Fixture Factory */
export type GenerateFixture<T> = (seedOrChance?: number | Chance.Chance) => T

const cache = new WeakMap<x.BaseSchema<any>, GenerateFixture<unknown>>()

/** @category Fixture Factory */
export type Overrides<T> =
  T extends Record<PropertyKey, unknown>
    ? { [Key in keyof T]?: GenerateFixtureFromSchema<T[Key]> }
    : never

/**
 * @category Fixture Factory
 * @example From object schema
 * ```ts
 * import { x } from 'unhoax'
 * import { createFixtureFactory } from 'unhoax-chance'
 *
 * const userSchema = x.object({ id: x.string, … })
 * const createRandomUser = createFixtureFactory(userSchema)
 * const createRandomUser: (seed?: number) => User
 *
 * // overriding generators for specific properties:
 * const createRandomUser = createFixtureFactory(userSchema, {
 *   id: (chance) => chance.guid(),
 * })
 *
 *
 * const user = createRandomUser()
 * const user = createRandomUser(42) // with seed
 * ```
 *
 * @example From array/Set/Map schema
 * ```ts
 * import { x } from 'unhoax'
 * import { createFixtureFactory } from 'unhoax-chance'
 *
 * const users = x.array(userSchema)
 * const users = x.mapOf(x.string, userSchema) // Map<id, user>
 * const users = x.setOf(userSchema)
 *
 * const createRandomUsers = createFixtureFactory(userSchema)
 * ```
 * <br>
 * @example From Primitive
 * ```ts
 * import { x } from 'unhoax'
 * import { createFixtureFactory } from 'unhoax-chance'
 *
 * const createRandomString = createFixtureFactory(x.string)
 * const result = createRandomString()
 * const result = createRandomString(42) // seed: 42
 * result: string
 *
 * const createRandomNumber = createFixtureFactory(x.number)
 * const result = createRandomNumber()
 * const result = createRandomNumber(42) // seed: 42
 * result: number
 * ```
 */
export function createFixtureFactory<T>(
  schema: x.BaseSchema<T>,
  overrides?: Overrides<T>,
): GenerateFixture<T> {
  const cached = cache.get(schema)
  if (cached) return cached as GenerateFixture<T>
  const generateFixture: GenerateFixture<T> = (seedOrChance) => {
    const chance =
      seedOrChance instanceof Chance
        ? seedOrChance
        : seedOrChance
          ? new Chance(seedOrChance)
          : new Chance()

    const schemaName = getSchemaName(schema)
    const make: GenerateFixtureFromSchema<any> | undefined = schemaName
      ? factories[schemaName]
      : overrides?.[schema.name]
    if (!make)
      throw new Error(
        `no mapping found for schema "${schema.name}" (inferred as "${schemaName}")`,
      )
    if (!overrides) return make(chance, schema)

    const { props } = schema as unknown as x.ObjectSchema<any>
    const customKeys = Object.keys(overrides)
    const trimmedProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !customKeys.includes(key)),
    )
    return {
      ...make(chance, x.object(trimmedProps as any)),
      ...Object.fromEntries(
        Object.entries(overrides).map(([key, generator]) => [
          key,
          generator(chance, props[key]),
        ]),
      ),
    }
  }
  cache.set(schema, generateFixture)
  return generateFixture
}

function getSchemaName(
  schema: x.BaseSchema<any>,
): keyof typeof factories | undefined {
  if (schema.name in factories) return schema.name as keyof typeof factories
  if (schema.name.startsWith('Map<')) return 'Map'
  if (schema.name.startsWith('Set<')) return 'Set'
  if (schema.name.startsWith('Array<')) return 'array'
  if ('props' in schema) return 'object'
  if (schema.meta?.union) return 'union'
  if (schema.meta?.literal) return 'literal'
  if (schema.name.startsWith('Record<')) return 'record'
  if ('items' in schema) return 'tuple'
  return undefined
}
