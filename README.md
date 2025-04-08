<p align="center">
  <img alt="Package Size" src="https://badgen.net/bundlephobia/minzip/unhoax-chance">
  <img alt="Total coverage" src="https://raw.githubusercontent.com/SacDeNoeuds/unhoax-chance/refs/heads/main/badges/coverage-total.svg">
  <img alt="Dependency Count" src="https://badgen.net/bundlephobia/dependency-count/unhoax-chance">
</p>

<p align="center">
Generate (seeded) chance fixtures based on <a href="https://github.com/SacDeNoeuds/unhoax">unhoax</a> schemas
</p>

<p align="center">
  <a href="#install">Install</a>
  <span>·</span>
  <a href="#overview">Usage</a>
  <span>·</span>
  <a href="https://sacdenoeuds.github.io/unhoax-chance/">Full Documentation</a>
</p>

---

## Install

```sh
npm i -D unhoax-chance
```

## Overview

```ts
import { createFixtureFactory } from 'unhoax-chance'
import { x } from 'unhoax'

const mySchema = x.object(…)
const createRandomX = createFixtureFactory(mySchema)
const createRandomX: (seed?: number) => X

const result = createRandomX()
const result = createRandomX(42)
```

Specifically for objects, you can override generators at property-level:

```ts
const mySchema = x.object({ id: x.string, … })

const createRandomX = createFixtureFactory(mySchema, {
  id: (chance) => chance.guid(),
})
```
