import auth0 from 'auth0-js';

const callbackURL = process.env.REACT_APP_CALLBACK_URL || 'http://localhost:3000/callback';

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN, // auth0 domain
      audience: '', // intended JWT audience
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID, // auth0 client id
      redirectUri: `${callbackURL}`, // callback destination
      responseType: 'id_token', // desired response (jwt)
      scope: 'openid email profile' // user information requested
    });

    
  }

  getProfile = () => {
    return this.profile;
  }

  getIdToken = () => {
    return this.idToken;
  }

  isAuthenticated = () => {
    return new Date().getTime() < this.expiresAt;
  }

  login = () => {
    console.log('callback URL:', callbackURL); // sanity check for callback URL
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => { // parse the callback's query parameter access token
        

        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }

        this.idToken = authResult.idToken;
        this.profile = authResult.idTokenPayload;
        // set the time that the id token will expire at
        this.expiresAt = authResult.idTokenPayload.exp * 1000;

        // assign gathered values to localStorage for persistence in the application
        localStorage.setItem('jwt', authResult.idToken);
        localStorage.setItem('email', authResult.idTokenPayload.email);
        localStorage.setItem('name', authResult.idTokenPayload.name);
        localStorage.setItem('img_url', authResult.idTokenPayload.picture);
        localStorage.setItem('isLoggedIn', true);
    
        resolve();
      });
    })
  }

  logout = () => {
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
    this.expiresAt = null;
    this.accessToken = null;

    // clear local storage
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('jwt');
    localStorage.removeItem('img_url');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accountType');
    localStorage.removeItem('userInfo');

  }
}

export default Auth;