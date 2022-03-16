import React from '../core/index.js';

import Text from './Text.jsx';

const app = (
  <div id="container">
    <Text text="one text" />
    <Text text="two text" />
    <Text text="three text" />
    <span className="hello">hello word</span>
  </div>
);

const rootDom = document.getElementById('app');

React.render(app, rootDom);
