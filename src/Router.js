import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
// BrowserRouter:針對瀏覽器的路由
// Switch:負責路由間的切換
// Route
import App from "pages/App";
import Login from "pages/Login";
import Register from "pages/Register";
import NotFound from "pages/NotFound";
import Cart from 'pages/Cart';

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/carts' element={<Cart />} />
            <Route element={<NotFound />} />
        </Routes>
    </BrowserRouter>
)

export default Router;