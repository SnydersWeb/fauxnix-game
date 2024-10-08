import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import './index.css';
import Game from './containers/Game.js';
import reducer from './reducers';

const store = configureStore({ reducer: reducer });

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./serviceworker.js")
        .then((reg) => console.log("Success:", reg.scope))
        .catch((err) => console.log("Failure:", err));
    });
}

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <Provider store={store}>
        <Game />
    </Provider>
);
