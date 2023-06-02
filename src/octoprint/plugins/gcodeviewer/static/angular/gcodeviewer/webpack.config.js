const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'gcodeviewer',

  exposes: {
    './Module': './src/app/app.module.ts',
    './GCodeTab': './src/app/app.component.ts'
  },

  

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
