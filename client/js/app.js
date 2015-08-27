
var React = require('react');

var app = {};
app.config = require('./config');


var App = require('./views/app.jsx');

var resume = require('./actions/resume');
resume.load();

React.render(
   <App />,
   document.getElementById('app')
);

