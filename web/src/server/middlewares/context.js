//
// Middleware for creating the context
// @param req
// @param res
// @param next
//
export default async function context(req, res, next) {
  // Get our token from headers (server) or cookies (client)
  // req.token = req.headers.token || req.cookies.token;

  // add navigator useragent for MUI provider
  global.navigator = {
    userAgent: req.headers['user-agent']
  };

  next();
}
