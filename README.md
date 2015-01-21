# Sort Specificity

Sort css selector for specificity
## Instalation

```sh
npm install sort-specificity
```

## Usage

```js
var sortSpecificity = require('sort-specificity')
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

### Input raw css
You can input raw css.

```js
var css = fs.readFileSync("./fixtures/sample.css", "utf-8")
var result = sortSpecificity(css) // parsed css selctor
```
