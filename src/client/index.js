import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const app = <App data={window.__data__}/>;

ReactDOM.hydrate(app, document.getElementById('root'));


