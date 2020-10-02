const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    tailwindcss('./tailwind.js'),
    //require("postcss-import"),
    //require("autoprefixer"),
    //{
    //  "tailwindcss": {},
    //  'postcss-flexbugs-fixes': {},
    //  'postcss-preset-env': {
    //    autoprefixer: {
    //      flexbox: 'no-2009',
    //    },
    //    stage: 3,
    //    features: {
    //      'custom-properties': false,
    //    },
    //  },
    //}
  ]
};