// src/WidgetWrapper.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Prompt from './components/Prompt';
import './assets/output.css'


const WidgetWrapper = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Prompt />
            </BrowserRouter>
        </React.StrictMode>
    );
};


ReactDOM.render(<WidgetWrapper />, document.getElementById('widget-root'));
