var specificity = require('specificity')
var flatten = require("flatten")
module.exports = function(selectors){
  var specifs = flatten(selectors.map(function(selector){
    return specificity.calculate(selector)
  }))
  var sorted = specifs.sort(function(a, b){
    return compare(a,b)
  })

  return sorted.map(function(item){
    return item.selector.trim()
  })
}

/**
 * return 1  if a < b(css specificity)
 * return 1  if a = b(css specificity)
 * return -1 if a > b(css specificity)
 */
var compare = module.exports.compare = function(a, b){
  if(!a.specificity){
    a = specificity.calculate(a)[0]
  }
  if(!b.specificity){
    b = specificity.calculate(b)[0]
  }
  var aSpec = a.specificity.split(",")
  var bSpec = b.specificity.split(",")
  for(var i=0 ; i < 4; i++){
    if(aSpec[i] == bSpec[i]){
      continue
    }
    if(aSpec[i] < bSpec[i]){
      return 1
    }else{
      return -1
    }
  }
  return 1
}
