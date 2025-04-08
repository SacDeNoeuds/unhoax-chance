import { createFixtureFactory } from './FixtureFactory'
import { generateArray } from './generator/array'
import { generateBigInt } from './generator/bigint'
import { generateBool } from './generator/boolean'
import { generateDate } from './generator/date'
import { generateLiteral } from './generator/literal'
import { generateMap } from './generator/Map'
import { generateFloat, generateInteger } from './generator/number'
import { generateObject } from './generator/object'
import { generateRecord } from './generator/record'
import { generateSet } from './generator/Set'
import { generateString } from './generator/string'
import { generateSymbol } from './generator/symbol'
import { generateTuple } from './generator/tuple'
import { generateUnion } from './generator/union'
import type { GenerateFixtureFromSchema } from './internal/GenerateFixtureFromSchema'

const builtInFactories = {
  boolean: generateBool,
  bigint: generateBigInt,
  Date: generateDate,
  integer: generateInteger,
  number: generateFloat,
  string: generateString,
  unsafeInteger: generateInteger,
  unsafeNumber: generateFloat,
  untrimmedString: generateString,
  literal: generateLiteral,
  symbol: generateSymbol,

  // composites
  array: generateArray(() => createFixtureFactory),
  object: generateObject(() => createFixtureFactory),
  Enum: generateLiteral,
  union: generateUnion(() => createFixtureFactory),
  Map: generateMap(() => createFixtureFactory),
  record: generateRecord(() => createFixtureFactory),
  Set: generateSet(() => createFixtureFactory),
  tuple: generateTuple(() => createFixtureFactory),
  // lazy: () => '',
  // ~to test~ tested via `union`
  // optional: () => '',
  // nullable: () => '',
  // nil: () => '',
} as const satisfies {
  [Key in string]?: GenerateFixtureFromSchema<any>
  // [Key in keyof typeof x]?: GenerateFixtureFromSchema<any>
}

/**
 * Mutate this object to override a built-in factory or add new ones
 *
 * @category Customizing
 * @example Adding factories for custom types
 * ```ts
 * type Email = string & { _tag: 'email' }
 * declare const isEmail: (input: unknown) => input is Email
 *
 * const emailSchema = x.fromGuard(
 *   'Email', // This name will be used for factories.
 *   isEmail,
 * )
 *
 * // registering your factory:
 * import { factories } from 'unhoax-chance'
 *
 * factories.Email = (chance) => chance.email() as Email
 * ```
 * <br>
 * <br>
 * @example Overriding a built-in factory Danger Zone ⚠️ Constraints won’t be handled by default.
 * ```ts
 * import { factories } from 'unhoax-chance'
 *
 * factories.boolean = (chance) => chance.bool({ likelihood: 0.75 })
 * ```
 */
export const factories: Record<string, GenerateFixtureFromSchema<any>> = {
  ...builtInFactories,
}
