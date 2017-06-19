/*!
 * n-deep-merge - recursive deep merge for objects and arrays
 * (c) 2014 Eric Clifford <ericgclifford@gmail.com>
 * MIT Licensed.
 *
 * http://github.com/eclifford/deep-merge
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return (root.deepmerge = factory(root));
    });
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(root);
  } else {
    root.deepmerge = factory(root);
  }
}(this, function(root) {

  function deepmerge(dest) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      if (!source && !~['boolean', 'string', 'number'].indexOf(typeof source)) {
        continue;
      }
        

      var isObj = typeof source === 'object',
          isArray = toString.call(source) == '[object Array]';

      if(isArray) {
        return source;
      } else if (isObj) {
        dest = dest || {};
        for (var key in source) {
          dest[key] = deepmerge(dest[key], source[key]);
        }
      } else {
        dest = source;
      }
    }
    return dest;
  }

  return deepmerge;
}));
