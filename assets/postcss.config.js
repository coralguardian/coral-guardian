module.exports = {
  plugins: [
    require('postcss-prefix-selector')({
      prefix: '#app',
      exclude: ['.v-application'],
      transform: function (prefix, selector, prefixedSelector) {
        if (selector.includes('.v-application')) {
          return selector;
        } else {
          return '#app ' + selector;
        }
      }
    })
    // require('postcss-filter-rules')({
    //   filter: (selector, parts) => selector.includes
    // }),
    // require('postcss-prepend-selector')({
    //   selector: '#app '
    // })
  ]
};