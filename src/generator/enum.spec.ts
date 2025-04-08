import { x } from 'unhoax'
import { testThatSchemaGenerates } from '../internal/test'

enum Direction1 {
  Left,
  Right,
}
enum Direction2 {
  Left = 'Left',
  Right = 'Right',
}

testThatSchemaGenerates('a numbered enum', x.Enum(Direction1))
testThatSchemaGenerates('a keyed enum', x.Enum(Direction2))
