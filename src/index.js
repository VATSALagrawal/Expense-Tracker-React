import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { Provider } from './context/context';
import './index.css';
import { SpeechProvider } from '@speechly/react-client'
ReactDOM.render(
    <SpeechProvider appId='2c6ecf6f-4ecc-4433-b128-44ce9084c52a' language='en-US'>
    <Provider>
    <App/>
    </Provider>
    </SpeechProvider>,
    document.getElementById('root'));