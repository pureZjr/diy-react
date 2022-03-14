import React from '../core/index.js';
React.default = React;

const a = (
  <div id="container">
    <span className="hello">hello word</span>
  </div>
);

React.render(a, document.getElementById('app'));
