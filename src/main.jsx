import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';

const backoffice = new URLSearchParams(window.location.search).get('h') === 'backoffice';
const [{ default: Page }, { pizzas } = {}] = backoffice
  ? await Promise.all([import('./Backoffice.js'), import('./App.js')])
  : [await import('./App.js')];
const props = backoffice ? { initialPizzas: pizzas } : {};

ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(Page, props) }));
