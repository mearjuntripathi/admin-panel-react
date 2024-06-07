import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Error from './pages/Error';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />
	},
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/forget-password',
		element: <ForgetPassword />
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router}/>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();