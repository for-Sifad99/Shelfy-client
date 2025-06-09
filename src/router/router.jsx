import React from 'react';
import {
    createBrowserRouter,
} from "react-router";
import PrivetRouter from '../router/PrivetRouter'
import Root from '../layouts/Root';
import Home from '../pages/Home/Home';
import AllBooks from '../pages/AllBooks/AllBooks';
import BorrowedBooks from '../pages/BorrowedBooks/BorrowedBooks';
import AddBooks from '../pages/AddBooks/AddBooks';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import ErrorPage from '../pages/ErrorPage/ErrorPage';


const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-books',
                element: <PrivetRouter><AllBooks /></PrivetRouter>
            },
            {
                path: '/borrowed-Books',
                element: <PrivetRouter><BorrowedBooks /></PrivetRouter>
            },
            {
                path: '/add-Books',
                element: <PrivetRouter><AddBooks /></PrivetRouter>
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/login',
                Component: Login
            },
        ]
    },
    {
        path: '/*',
        Component: ErrorPage
    },
]);

export default router;