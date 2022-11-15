import React from 'react'
import './App.css';
import Login from './components/login'
import Home from './components/home'
import Dashboard from './components/dashboard';
import Register from './components/register';
import { Routes, Route } from 'react-router-dom'
import Edit from './components/edit';



function App() {
  return (
    <>
      <div>
        <h1>Navbar</h1>
      </div>
      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login title='login bray' />} />
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        {/* protected routes */}
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/edit' element={<Edit />} />



        {/* err */}
        <Route path='*' element={<h1>PAGE NOT FOUND</h1>} />
      </Routes>

    </>
  );
}

export default App;
