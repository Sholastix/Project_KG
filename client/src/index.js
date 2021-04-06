import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import Auth from './contexts/authContext';

// Розгортаємо контекст на увесь додаток.
ReactDOM.render(<Auth><App /></Auth>, document.getElementById('root'));