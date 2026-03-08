// Exclude Swagger UI from Helmet
module.exports = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
    },
  },
}