import React from 'react';
import { ToastContainer as ReactToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 컴포넌트 정의
const ToastContainer = () => <ReactToastContainer position="top-center" autoClose={3000} />;

export default ToastContainer;
