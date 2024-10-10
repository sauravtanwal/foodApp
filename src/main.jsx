import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import './index.css'


import { BrowserRouter } from "react-router-dom"
import GlobalState from './context/index.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>

        <React.StrictMode>
            <GlobalState>
                <App />

            </GlobalState>
        </React.StrictMode>
    </BrowserRouter>
);
