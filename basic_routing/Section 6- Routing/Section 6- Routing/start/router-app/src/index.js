import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    // this component wraps the history object in browsers and passes it down the component tree
    // anywhere in the component tree we will be able to use the history object 
    <BrowserRouter>
        <App />
    </BrowserRouter>,
     document.getElementById('root'));
registerServiceWorker();
