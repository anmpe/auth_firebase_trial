import React from 'react'
import AuthModel from './AuthModel';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


const Home=require('./Presenters/homePresenter.js').default;
const LogIn=require('./Presenters/loginPresenter.js').default;
const Signup=require('./Presenters/signupPresenter.js').default;

function App() {
  const model = new AuthModel();
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path ="/home" element= {<Home model = {model}/>}/>
          <Route path ="/login" element= {<LogIn model = {model}/>}/> {/* what if I want path to be "/" so that's the first thing that is rendered when app is passed */}
          <Route path ="/signup" element= {<Signup model = {model}/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
