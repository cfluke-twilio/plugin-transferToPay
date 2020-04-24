// your account sid
var accountSid = 'AC5c657625cf6b0d3d6797a79150aeb6a7'

// set to /plugins.json for local dev
// set to /plugins.local.build.json for testing your build
// set to "" for the default live plugin loader
var pluginServiceUrl = '/plugins.json'

var appConfig = {
  pluginService: {
    enabled: true,
    url: pluginServiceUrl,
  },
  sso: {
    accountSid: accountSid,
  },
  logLevel: 'debug',
}
