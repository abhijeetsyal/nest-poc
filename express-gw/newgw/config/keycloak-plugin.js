const KeycloakConnect = require('keycloak-connect');
const session = require('express-session');

module.exports = {
  version: '1.2.0',
  init: function (pluginContext) {
    const memoryStore = new session.MemoryStore();
    const keycloak = new KeycloakConnect({ store: memoryStore }, {
      "realm": "astro",
      "auth-server-url": "http://localhost:8080",
      "ssl-required": "external",
      "resource": "myclient",
      "confidential-port": 0,
      "credentials": {
        "secret": "Rwwhxnf2hPfmEY4Qw8OjPeKUYy1Ao5Rf"
      }
    });

    pluginContext.registerPolicy({
      name: 'keycloak',
      policy: ({ tokenService }) => (req, res, next) => {
        keycloak.protect()(req, res, (err) => {
          if (err) {
            res.status(401).json({ error: 'Unauthorized' });
          } else {
            next();
          }
        });
      }
    });

    pluginContext.registerCondition({
      name: 'keycloak-auth',
      handler: (req, conditionConfig) => {
        return keycloak.protect()(req, {}, (err) => !err);
      }
    });
  }
};