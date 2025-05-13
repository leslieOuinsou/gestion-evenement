module.exports = function override(config, env) {
    config.devtool = false; // Désactive les source maps
    return config;
  };
  