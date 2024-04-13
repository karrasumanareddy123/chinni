// Routing.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Home';
import Post from './Post';
import Get from './Get';
import SignUp from './Signup';
import Login from './Login'

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Existing routes */}
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} /> 
          <Route path="/get" element={<Get />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Your new route with initial data */}
          <Route path="/post" element={<Post initialData={["Data 1", "Data 2"]} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
