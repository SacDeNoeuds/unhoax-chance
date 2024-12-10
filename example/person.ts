import pipe from 'just-pipe'
import * as x from 'unhoax'
import { createFixtureFactory } from '../src/main'

type Branded<A, Tag> = A & { _tag: Tag }
function castAs<A, B extends A>(value: A) {
  return value as B
}

type PersonId = Branded<string, 'PersonId'>
type PersonName = Branded<string, 'PersonName'>
type PersonAge = Branded<number, 'PersonAge'>

type Person = {
  id: PersonId
  name: PersonName
  age: PersonAge
}

const PersonName = pipe(
  x.string,
  x.size({ min: 3, max: 50 }),
  x.map(castAs<string, PersonName>),
)

const PersonId = pipe(
  x.string,
  x.size({ min: 12, max: 12 }),
  x.map(castAs<string, PersonId>),
)

const PersonAge = pipe(
  x.integer,
  x.min(18, 'Must be major'),
  x.max(150, 'After it’s unlikely AND too old'),
  x.map(castAs<number, PersonAge>),
)

const Person = x.object<Person>({
  id: PersonId,
  name: PersonName,
  age: PersonAge,
})

const RandomPerson = createFixtureFactory(Person, {
  id: (chance) => chance.guid() as PersonId,
  name: (chance) => chance.name({ full: true }) as PersonName,
})
const person = RandomPerson(1)
console.info(person)
