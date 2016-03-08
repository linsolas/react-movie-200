/** Styles */
require('bootstrap/dist/css/bootstrap.min.css');
require('./App.css');

/** Polyfills */
require('babel-polyfill');
require('whatwg-fetch');

var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./App.jsx');

// Faire le routing ici


ReactDOM.render(<App />, document.getElementById('main'));
