# webpack5-mpa

Webpack custom builder for static landing pages or multipage web-applications.

Contains:

* babel +++
  * add TypeScript ???
  * add some js-code and libraries ---
* images +++
  * img-tags +++
  * url-loader +++
  * bacground-image in css +++
  * inline backgroud-image ---
  * images prod optimization ---
  * handle images without CopyWebpackPlugin +++
* styles +++
  * use scss +++
  * use vars and mixins +++
  * autoprefixer in prod mode +++
  * one bundle and optimization in prod-mode +++
* html +++
  * prod-optimization +++
  * include common html-parts with html-preproc ---
* fonts +++
* favicons +++
* check deploy +++

## npm
[https://www.npmjs.com/](https://www.npmjs.com/)

## Webpack 5 
[https://webpack.js.org/](https://webpack.js.org/)

## Babel
[https://babeljs.io/](https://babeljs.io/)

## SCSS
[https://sass-lang.com/](https://sass-lang.com/)

## Normalize
[https://necolas.github.io/normalize.css/](https://necolas.github.io/normalize.css/)

## Bootstrap 5
[https://getbootstrap.com/](https://getbootstrap.com/)

## ESLint
[https://eslint.org/](https://eslint.org/)


```npm i -g eslint```
```npm i --save dev babel-eslint```
```eslint --init```

## .eslintrc.json

install IDE ESlint plugin

```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
  }
}
```



