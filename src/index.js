import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Login from './component/Login';
// import App from 'component/App';
import Router from 'Router';
import 'css/app.scss';
import 'css/style.scss';

import 'commons/auth';



ReactDOM.render(
<div>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
    <Router />
</div>,
 document.getElementById('root'))