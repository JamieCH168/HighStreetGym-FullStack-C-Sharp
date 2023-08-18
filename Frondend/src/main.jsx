if (typeof process === 'undefined') {
  window.process = {
    env: { NODE_ENV: 'development' }
  };
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AuthenticationProvider } from './hooks/authentication.jsx'

import './main.css'

import { Buffer } from 'buffer';
import * as util from 'util';
import inherits from 'inherits';
window.Buffer = Buffer;
window.util = util;
window.inherits = inherits;



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationProvider router={router}>
      <RouterProvider router={router} />
    </AuthenticationProvider>
  </React.StrictMode>,
)
