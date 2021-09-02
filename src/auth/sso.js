import auth0 from 'auth0-js'

class SSO {
  constructor() {
    this.auth0Client = new auth0.WebAuth({
      domain: 'corvux.us.auth0.com',
      clientID: 'pZMfX5rRrut76LLRQN5UnALov7yqCeYj',
      audience: 'https://corvux.us.auth0.com/api/v2/',
      redirectUri: 'https://evnt.andresg.me/login',
      scope: 'openid email profile',
      responseType: 'token id_token',
    })
  }

  login(username, password) {
    this.auth0Client.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password,
    }, (error, response) => {
      if (error) return console.error('Error the make http request to sso')

      return response
    })
  }

  loginWithGoogle() {
    this.auth0Client.authorize({ connection: 'google-oauth2' })
  }

  loginWithFacebook() {
    this.auth0Client.authorize({ connection: 'facebook' })
  }

  parseHash(hash) {
    return new Promise((resolve, rejected) => {
      this.auth0Client.parseHash({ hash }, (error, response) => {
        if (error) rejected(error)
        resolve(response)
      })
    })
  }
}

export default new SSO()
