/**
 * Defaults which can be overridden ; if you face performance issues for instance.
 * @category Customizing
 * @example
 * ```ts
 * import { defaults } from 'unhoax-chance'
 *
 * defaults.maxArraySize = 100
 * defaults.maxMapSize = 100
 * defaults.maxRecordSize = 100
 * defaults.maxSetSize = 100
 * defaults.maxDateValue = new Date('2150-01-01').valueOf()
 * defaults.minDateValue = new Date('1900-01-01').valueOf()
 * ```
 */
export const defaults = {
  maxArraySize: 1_000,
  maxMapSize: 1_000,
  maxRecordSize: 1_000,
  maxSetSize: 1_000,
  maxDateValue: 8_640_000_000_000_000,
  minDateValue: -8_640_000_000_000_000,
}
