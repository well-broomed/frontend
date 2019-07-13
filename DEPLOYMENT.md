# WellBroomed - Frontend Deployment

### Deployment protocols and procedures for [WellBroomed](https://www.wellbroomed.com)

## Table of Contents

1. [Environment Variables](#Environment-Variables)
2. [Yarn](#yarn)
3. [Netlify](#Netlify)

WellBroomed is built using React and Redux on the front-end, with a Material-UI component library.

It is hosted on Netlify, and these build instructions will assume you have also chosen Netlify for your front-end deployment service.

:exclamation:
## If you have not completed the [backend setup](https://github.com/well-broomed/backend/blob/deployment-docs/DEPLOYMENT.md), please do so before proceeding. This configuration will ensure that you have access to the necessary variable values needed for build and deployment, particularly with regard to Auth0.
:exclamation:

The first thing you will need to do is fork and clone your own repository, as that is where you will need to make your changes. Ensure that there is a `.env` file in the top-level directory of the repository.

**Ensure that `.env` is listed within your `.gitignore` file.**

Once you have a forked and cloned local repository with a new `.env` file, proceed to do the following.

## Environment Variables

Within the local `.env` file you will need some values from the Auth0 application you created during the backend setup. The values will remain unchanged, but their names must follow the convention of `REACT_APP_VARIABLE_NAME`, as otherwise the value will not be incorporated into the application at build time.

Insert the following into the `.env` file:

```
REACT_APP_AUTH0_DOMAIN = 'mydomain.auth0.com'
REACT_APP_AUTH0_CLIENT_ID 'abcd1234efgh5678'
```

These values are necessary in order to complete the authorization process in sign-in and sign-up.

## Yarn

Once these `.env` values are in place, go to the top-level directory of the repository in your console and type `yarn start`. This will gather the necessary dependencies and build the application to be hosted locally. Be sure to commit and push the newly created `yarn.lock` file to your remote repository, as it is necessary for Netlify to build the site properly.

## Netlify

If your local build compiles successfully, you should now be able to deploy to Netlify with a couple of additional environment variables for the live site.

Once you have created your new site in Netlify and connected it to your frontend repository on Github, you will require some environment variables for Netlify to build the application properly. 

They are as follows:

```
REACT_APP_AUTH0_CLIENT_ID
REACT_APP_AUTH0_DOMAIN
REACT_APP_BACKEND_URL
REACT_APP_CALLBACK_URL
REACT_APP_FRONTEND_URL
```

The `REACT_APP_AUTH0_CLIENT_ID` and `REACT_APP_AUTH0_DOMAIN` are the same values as in your local `.env` file.

`REACT_APP_BACKEND_URL` is the URL for the backend deployment hosted on Heroku. Ensure there is no trailing backslash on this URL.

`REACT_APP_CALLBACK_URL` is the callback URL designated for this domain within the Auth0 application. Ensure that it matches the URL given to Auth0 exactly, with no trailing backslashes.

`REACT_APP_FRONTEND_URL` is the URL that you would like the application to handle for purposes of redirects etc. This is in case you are using a development deployment and a production deployment, or want to utilize A/B testing of different builds. Simply swap the frontend URL value to point the application to whichever domain you choose. Without this value, the URL will default to `http://localhost:3000`.

With these environment variables in place, utilize the `yarn build` command in the deployment settings with the `build/` directory as your publish directory. 

Netlify should build the site, and that's all you'll need for the front-end deployment.