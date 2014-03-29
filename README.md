# Sort Specificity

Sort css selector for specificity

## Usage

```js
var sortSpecificity = require('./index')
//var sortSpecificity = require('sort_specificity')
var input = [
  "a .d b#foo",
  "b",
  "a .d b.d",
  "a b",
  "a .d b",
]
var result = sortSpecificity(input)
```

result is

```js
[
  "a .d b#foo",
  "a .d b.d",
  "a .d b",
  "a b",
  "b"
]
```
