module.exports = function override(config, env) {
    // Tu peux ajouter des personnalisations Webpack ici
    // Exemple: Désactiver les source maps
    config.devtool = false;
    return config;
  };
  