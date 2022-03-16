import React from '../core/index.js';
React.default = React;

const a = (
  <div id="container">
    <span className="hello">hello word</span>
  </div>
);

const rootDom = document.getElementById('root');

function tick() {
  const time = new Date().toLocaleTimeString();
  const clockElement = <h1>{time}</h1>;
  React.render(clockElement, document.getElementById('app'));
}

tick();
setInterval(tick, 1000);
