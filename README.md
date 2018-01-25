# Predix Design System Sample App (React) - Map with Directions

This project is a proof-of-concept that shows how to use Predix Design System components, the Mapbox SDK, and React to build a simple directions app.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and the [Predix Design System React Sample App](https://github.com/predixdesignsystem/px-sample-app-react). It uses the Mapbox JavaScript SDK for geocoding address searches and fetching potential driving routes.

## How to run on your machine

### Install tools

If you don't have them already, you'll need node, bower and gulp to be installed globally on your machine:

1. Install [node](https://nodejs.org/en/download/). This includes npm - the node package manager.
2. Install [bower](https://bower.io/) globally: `$ npm install bower -g`
3. Install [gulp](http://gulpjs.com/) globally: `$ npm install gulp-cli -g`

### Clone the project and install dependencies

Use git to clone the project down to your machine. Open a shell and change directory into the new project you just cloned, then install dependencies:

```
$ npm install
$ bower install
```

### Running the app locally

The app uses Create React App's `react-scripts` module to serve locally for development. Run `$ npm run start` to serve the app. Automatic file rebuilding and hot module reloading is enabled by default.

Additionally the Predix Design System CSS modules are built and loaded using a separately task. The modules are installed with bower and built from SCSS into CSS, and the resulting built code is checked in to the repo at `public/css/px-styles.css`. The source SCSS is at `sass/px-styles.scss`. If you make changes to the source SCSS, run `$ npm run scss` to rebuild the CSS. You should not add custom CSS classes to style your React application from inside this SCSS file — it is loaded on the page in `index.html` to provide utility classes that can be used inside any React component.

## Copyright

Copyright &copy; 2015, 2016, 2017 GE Global Research. All rights reserved.

The copyright to the computer software herein is the property of
GE Global Research. The software may be used and/or copied only
with the written permission of GE Global Research or in accordance
with the terms and conditions stipulated in the agreement/contract
under which the software has been supplied.
