import './App.css';
import {  Navigate, Route, Routes } from "react-router-dom";
import SignIn from './Pages/SignIn';
import Create from './Pages/create';
import Email from './Pages/email';
import Forget from './Pages/Forget';
import { ToastContainer } from 'react-toastify';
import Dashboard from './Pages/Dashboard';




function App() {
  return (
    <div className="App">
      <Routes>
       
      <Route path='/' element={<SignIn/>} />
      <Route path='/signup' element={<Create/>} />
      <Route path='/email' element={<Email/>} />
      <Route path='/forget' element={<Forget/>} />
      <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='*' element={<Navigate to='/' />}/>
      
      </Routes>
      <ToastContainer/>
    </div>
    )
}

export default App;


export const url ='https://email-sender-zckq.onrender.com';