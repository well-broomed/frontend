import Auth0Lock from 'auth0-lock';

const frontendURL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';

var lockOptions = {
    auth: {
        redirectUrl: `${frontendURL}/callback`,
        responseType: 'token id_token',
        params: {
            scope: 'profile openid email'
        }
    },
    theme: {
        primaryColor: '#3d3d3d'
    },
    languageDictionary: {
        title: 'WellBroomed'
    },
    // Additional fields can be added like this.
    // additionalSignUpFields: [
    //     {
    //     type: 'select',
    //     name: 'role',
    //     placeholder: 'User Type',
    //     options: [
    //         {value: 'manager', label: 'Property Manager'},
    //         {value: 'assistant', label: 'Assistant'},
    //     ]},
    // ],
    // initialScreen: 'signUp', // prompts for sign-up initially
}

var lock = new Auth0Lock(
    process.env.REACT_APP_AUTH0_CLIENT_ID,
    process.env.REACT_APP_AUTH0_DOMAIN,
    lockOptions,
  );

export default lock;