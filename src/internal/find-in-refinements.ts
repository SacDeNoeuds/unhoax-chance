import { x } from 'unhoax'

// export const findInRefinements =
//   (key: string) =>
//   (schema: x.BaseSchema<any>): any | undefined => {
//     for (const { meta } of schema.refinements ?? {}) {
//       if (meta && key in meta) return meta[key]
//     }
//     return undefined
//   }

export function minSize(schema: x.BaseSchema<any>): number {
  return (schema.refinements?.size?.min ?? 0) as number
}
export function maxSize(schema: x.BaseSchema<any>): number | undefined {
  return schema.refinements?.size?.max as number | undefined
}

export function min(schema: x.BaseSchema<any>): number | undefined {
  const config = schema.refinements?.min
  const min = config?.value
  if (!min) return schema.name === 'bigint' ? 0 : undefined
  const minValue = Number(min.valueOf())
  return config?.exclusive
    ? minValue + (schema.name.toLowerCase().includes('number') ? 0.01 : 1)
    : minValue
}
export function max(schema: x.BaseSchema<any>): number | undefined {
  const config = schema.refinements?.max
  const max = config?.value
  if (!max) return undefined
  const maxValue = Number(max.valueOf())
  return config?.exclusive
    ? maxValue - (schema.name.toLowerCase().includes('number') ? 0.01 : 1)
    : maxValue
}
