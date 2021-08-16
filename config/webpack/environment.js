const { environment } = require('@rails/webpacker')

environment.plugins.prepend('Provide', new webpack.ProvidePlugin({
    Popper: ['popper.js', 'default'], // for Bootstrap 4
  })
)

module.exports = environment

const nodeModulesLoader = environment.loaders.get('nodeModules');
if (!Array.isArray(nodeModulesLoader.exclude)) {
  nodeModulesLoader.exclude = nodeModulesLoader.exclude == null ? [] : [nodeModulesLoader.exclude];
}

nodeModulesLoader.exclude.push(/react-table/);
