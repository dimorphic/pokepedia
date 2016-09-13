// deps
import ENV_CONFIG from '../../config';

// helpers
const UTILS = ENV_CONFIG.get('utils');

// export default {
//   web: {
//     host: '0.0.0.0', // bind on all interfaces
//     port: 8000,
//
//     favicon: `${UTILS.paths.assets()}/pokepedia-favicon.png`,
//     static: [
//       {
//         url: '/assets',
//         path: UTILS.paths.assets()
//       },
//       {
//         url: '/build',
//         path: UTILS.paths.build()
//       }
//     ]
//   },
//
//   // session: {
//   //   salt: 'SUPER_SALTY_YES?',
//   //   secret: 'SUPER_SECRET_KEY_KERE',
//   //   expires: 2 * 3600 * 1000 // 2 hours
//   // },
//
//   databases: {
//     mongo: 'mongodb://127.0.0.1:27017/pokepedia'
//   }
// };

// @NEW
const CONFIG = {
  default: {
    web: {
      host: '0.0.0.0', // bind on all interfaces
      port: 8000,

      favicon: `${UTILS.paths.assets()}/pokepedia-favicon.png`,
      static: {
        assets: {
          url: '/assets',
          path: UTILS.paths.assets()
        },

        build: {
          url: '/build',
          path: UTILS.paths.build()
        }
      }
    },

    // session: {
    //   salt: 'SUPER_SALTY_YES?',
    //   secret: 'SUPER_SECRET_KEY_KERE',
    //   expires: 2 * 3600 * 1000 // 2 hours
    // },

    databases: {
      mongo: 'mongodb://127.0.0.1:27017/pokepedia'
    }
  },

  development: {},
  production: {}
};

export default CONFIG[process.env.NODE_ENV] ?
{ ...CONFIG.default, ...CONFIG[process.env.NODE_ENV] } :
{ ...CONFIG.default, ...CONFIG.development };
