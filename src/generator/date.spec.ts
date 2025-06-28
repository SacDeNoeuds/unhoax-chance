import { x } from 'unhoax'
import { describe } from 'vitest'
import { testThatSchemaGenerates } from '../internal/test'

describe('date', () => {
  testThatSchemaGenerates('a random date', x.date)

  const dateIn2000 = new Date('2000-01-01T00:00:00.000Z')
  const isoString = dateIn2000.toISOString().slice(0, 10)

  testThatSchemaGenerates(`a date < ${isoString}`, x.date.max(dateIn2000))

  testThatSchemaGenerates(`a number > ${isoString}`, x.date.min(dateIn2000))

  testThatSchemaGenerates(
    `a number between ${isoString} and now`,
    x.date.min(dateIn2000).max(new Date()),
  )
})
