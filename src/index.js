import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bank from './Bank/Bank.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Bank/>, document.getElementById('root'));


serviceWorker.unregister();
