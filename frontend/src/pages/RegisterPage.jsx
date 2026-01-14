import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import BorderAnimated from '../components/BorderAnimated'
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from 'lucide-react';
import { Link } from 'react-router';

function SignUpPage() {
  const [formdata, setformdata] = useState({ username: '', email: '', password: '' });
  const { signUp, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(formdata);
  }

  return (
    <div className='w-full h-full flex items-center justify-center overflow-hidden'>
      <div className="relative w-full max-w-6xl h-full max-h-[850px] flex items-center justify-center">
        <BorderAnimated>
          <div className='w-full h-full flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-xl rounded-xl overflow-hidden'>
            
            <div className='md:w-1/2 h-full p-6 md:p-10 flex flex-col items-center md:border-r border-slate-600/30'>
              <div className='w-full max-w-sm h-full flex flex-col justify-between py-4'>
                
                <div className='text-center'>
                  <MessageCircleIcon className='size-12 mx-auto text-slate-500 mb-3' />
                  <h2 className='text-2xl md:text-3xl font-bold text-slate-200 mb-1'>Create Account</h2>
                  <p className='text-slate-400 text-sm'>Sign up for a new account</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-4 md:space-y-5'>
                  <div>
                    <label className='auth-input-label'>Username</label>
                    <div className='relative'>
                      <UserIcon className='auth-input-icon' />
                      <input 
                        type='text' 
                        value={formdata.username} 
                        onChange={(e) => setformdata({ ...formdata, username: e.target.value })} 
                        className='input py-2.5 md:py-3' 
                        placeholder='Username' 
                      />
                    </div>
                  </div>

                  <div>
                    <label className='auth-input-label'>Email</label>
                    <div className='relative'>
                      <MailIcon className='auth-input-icon' />
                      <input 
                        type='email' 
                        value={formdata.email} 
                        onChange={(e) => setformdata({ ...formdata, email: e.target.value })} 
                        className='input py-2.5 md:py-3' 
                        placeholder='Email' 
                      />
                    </div>
                  </div>

                  <div>
                    <label className='auth-input-label'>Password</label>
                    <div className='relative'>
                      <LockIcon className='auth-input-icon' />
                      <input 
                        type='password' 
                        value={formdata.password} 
                        onChange={(e) => setformdata({ ...formdata, password: e.target.value })} 
                        className='input py-2.5 md:py-3' 
                        placeholder='Password' 
                      />
                    </div>
                  </div>

                  <button className='auth-btn py-2.5 md:py-3' type='submit' disabled={isSigningUp}>
                    {isSigningUp ? <LoaderIcon className='size-5 animate-spin mx-auto' /> : "Create Account"}
                  </button>
                </form>

                <div className='text-center my-6'>
                  <Link to='/login' className='auth-link'>Already have an account? Login</Link>
                </div>
              </div>
            </div>

            <div className="hidden md:flex md:w-1/2 h-full items-center justify-center p-8 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div className="flex flex-col items-center justify-between h-full py-8">
                <div className="flex-1 flex items-center">
                  <img
                    src="/signup.png"
                    alt="Illustration"
                    className="max-h-[250px] lg:max-h-[350px] w-auto object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl lg:text-2xl font-medium text-cyan-400">Start Your Journey Today</h3>
                  <div className="mt-4 flex justify-center gap-3">
                    <span className="auth-badge px-4 py-1.5">Free</span>
                    <span className="auth-badge px-4 py-1.5">Easy Setup</span>
                    <span className="auth-badge px-4 py-1.5">Private</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </BorderAnimated>
      </div>
    </div>
  )
}

export default SignUpPage