# easyNote

Todo list + Notes app created using React, Firebase, re-base and Webpack, following ESLint / Airbnb style guide.

## Installation

You will need to install [NodeJS](http://nodejs.org/).

```sh
# Clone the repository:
$ git clone git@github.com:leonardofaria/easynote.git
$ cd easynote

# Installs all the dependencies:
$ npm install

# Rename .env.example to .env and add your Firebase information
$ mv .env.example .env

# Starts a local server on port 3000
$ npm start
```

## Deployment

```sh
$ npm run deploy
```
It creates the compiled assets in `dist` folder and it deploys them in Firebase hosting.