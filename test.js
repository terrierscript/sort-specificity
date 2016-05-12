var rewire = require("rewire")
var sortSpecificity = rewire('./index')
var fs = require("fs")
var assert = require('assert')

describe('specificity', function(){
  it('sort', function(){
    var input = [
      "a .d b#foo",
      "b",
      "a .d b.d",
      "a b",
      "a .d b",
    ]
    var result = sortSpecificity(input)
    var expect = [
      "a .d b#foo",
      "a .d b.d",
      "a .d b",
      "a b",
      "b"
    ]
    assert.deepEqual(result, expect)
  })
  it('sort', function(){
    var input = [
      "a",
      ".foo",
      "div"
    ]
    var result = sortSpecificity(input)
    var expect = [
      ".foo",
      "a",
      "div",
    ]
    assert.deepEqual(result, expect)
  })
  it('same level sorting', function(){
    var input = [
      "a b",
      "a d", // after selector has more power
    ]
    var result = sortSpecificity(input)
    var expect = [
      "a b",
      "a d",
    ]
    assert.deepEqual(result, expect)
  })
  it("selector with comma", function(){
    var input = [
      "a,b.c", "p"
    ]
    var expect =[
      "b.c", "a", "p"
    ]
    var result = sortSpecificity(input)
    assert.deepEqual(result, expect)
  })
  it("trim selector", function(){
    var input = [
      " a "," b "
    ]
    var expect =[
      "a", "b"
    ]
    var result = sortSpecificity(input)
    assert.deepEqual(result, expect)
  })
  it("input raw css", function(){
    var file = fs.readFileSync("./fixtures/sample.css", "utf-8")
    var result = sortSpecificity(file)
    var expect = [ 'a .b #c', '.a .b', 'a.b', 'a .b', '.a', '.b' ]
    assert.deepEqual(result, expect)
  })
  it("the sort is stable", function(){
    var input = ['.c', '.b.', '.a']
    var result = sortSpecificity(input)
    assert.deepEqual(result, input)
  })
})

describe("parseSelectors", function(){
  it("enable parse css selectors", function(){
    var css = fs.readFileSync("./fixtures/sample.css", "utf-8")
    var result = sortSpecificity.__get__("parseSelectors")(css)
    var expect = [ '.a', '.b', '.a .b', 'a.b', 'a .b', 'a .b #c' ]
    assert.deepEqual(result, expect)
  })
})

describe("compare", function(){
  it("a < b", function(){
    assert.equal(sortSpecificity.compare("a", "a b"), 1)
  })
  it("a = b", function(){
    assert.equal(sortSpecificity.compare("a", "b"), 0)
  })
  it("a > b", function(){
    assert.equal(sortSpecificity.compare("b a", "b"), -1)
  })
  it("a,b > c is error")
})
