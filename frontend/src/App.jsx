import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import { useAuthStore } from './store/useAuthStore'
import Pageloader from './components/Pageloader'
import {Toaster} from 'react-hot-toast'
import SignUpPage from './pages/RegisterPage'

function App() {
  const {checkAuth,authUser,isCheckingAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[])
  if(isCheckingAuth) return <Pageloader/>
  return( 
    <div className='min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden'>
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none"style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '20px 50px',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D62246] rounded-full blur-[120px] opacity-30" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#17BEBB] rounded-full blur-[120px] opacity-30" />
      </div>
    <Routes>
      <Route path='/' element={authUser?<ChatPage/>:<Navigate to={"/login"}/>} />
      <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to={"/"}/>}/>
      <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to={"/"}/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App