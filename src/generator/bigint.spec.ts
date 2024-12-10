import * as x from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

testThatSchemaGenerates('a bigint', x.bigint)
