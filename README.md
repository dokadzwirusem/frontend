[![Netlify Status](https://api.netlify.com/api/v1/badges/d84b2940-70d4-486c-8173-fe98c21fa05e/deploy-status)](https://app.netlify.com/sites/koronapoints/deploys)

## Available Scripts

In the project directory, you can run:

### Local setup

Clone the repository and Install all dependencies with `yarn install` command.

If you want to let authentication work on your local, create `.env` file in root
of a project with the following content:

```
REACT_APP_AUTH_CLIENT=123456
```

Replace `123456` with a valid client ID.


### `yarn start`

Runs the app in the development mode.<br>
The site is served on [http://localhost:3000](http://localhost:3000).

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn start:netlify`

Runs the app in the development mode, but with the Netlify features enabled.
The site is served on [http://localhost:8888](http://localhost:8888).

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!
