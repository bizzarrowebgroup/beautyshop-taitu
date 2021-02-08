// module.exports = {
//   devIndicators: {
//     autoPrerender: false
//   }
// }
const withTM = require('next-transpile-modules')([
  '@fullcalendar',
])

module.exports = withTM({
  devIndicators: {
    autoPrerender: false
  }
})
