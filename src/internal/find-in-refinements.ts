import { x } from 'unhoax'

export const findInRefinements =
  (key: string) =>
  (schema: x.Schema<any>): any | undefined => {
    for (const { meta } of schema.refinements ?? []) {
      if (meta && key in meta) return meta[key]
    }
    return undefined
  }

export const min = findInRefinements('min')
export const max = findInRefinements('max')
