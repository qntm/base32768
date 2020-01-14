module.exports = [{
  // nearly indistinguishable from a copy and paste of the source
  input: 'src/index.js',
  output: {
    file: 'dist/es6/base32768.js',
    format: 'esm'
  }
}, {
  // same as above but Node.js-friendly
  input: 'src/index.js',
  output: {
    file: 'dist/cjs/base32768.js',
    format: 'cjs'
  }
}, {
  // this can be imported into the browser as a script
  input: 'src/index.js',
  output: {
    file: 'dist/iife/base32768.js',
    format: 'iife',
    name: 'base32768'
  }
}]
