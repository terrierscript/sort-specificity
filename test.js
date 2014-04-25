var sortSpecificity = require('./index')
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
      "div",
      "a",
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
      "a d",
      "a b",
    ]
    assert.deepEqual(result, expect)
  })
  it("selector with comma", function(){
    var input = [
      "a,b.c", "p"
    ]
    var expect =[
      "b.c", "p", "a"
    ]
    var result = sortSpecificity(input)
    assert.deepEqual(result, expect)
  })
  it("trim selector", function(){
    var input = [
      " a "," b "
    ]
    var expect =[
      "b", "a"
    ]
    var result = sortSpecificity(input)
    assert.deepEqual(result, expect)
  })

})

describe("compare", function(){
  it("a < b", function(){
    assert.equal(sortSpecificity.compare("a", "a b"), 1)
  })
  it("a = b", function(){
    assert.equal(sortSpecificity.compare("a", "b"), 1)
  })
  it("a > b", function(){
    assert.equal(sortSpecificity.compare("b a", "b"), -1)
  })
})
