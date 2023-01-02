import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { store } from './store'
import { Provider } from 'react-redux';
import { ModalContextProvider } from './context/ModalContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ModalContextProvider>
                <App />
            </ModalContextProvider>
        </Provider>
    </React.StrictMode>
);