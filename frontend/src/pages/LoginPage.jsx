import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimated from "../components/BorderAnimated";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({username:"",email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  function isEmail(emailString) {
  // A common and robust regex for email validation
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(emailString);
}
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isEmail(formData.email)){
      setFormData({...formData,username:formData.email,email:""})
    }
    login(formData);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      <div className="relative w-[95%] max-w-6xl h-[90%] max-h-[850px] flex">
        <BorderAnimated>
          <div className="w-full h-full flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-xl rounded-xl overflow-hidden">
            
            <div className="md:w-1/2 h-full p-6 md:p-10 flex flex-col items-center md:border-r border-slate-600/30">
              <div className="w-full max-w-sm h-full flex flex-col justify-between py-4">
                
                <div className="text-center">
                  <MessageCircleIcon className="size-12 mx-auto text-slate-500 mb-3" />
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-1">Welcome Back</h2>
                  <p className="text-slate-400 text-sm">Login to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input py-2.5 md:py-3"
                        placeholder="Enter your email or username"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input py-2.5 md:py-3"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <button className="auth-btn py-2.5 md:py-3" type="submit" disabled={isLoggingIn}>
                    {isLoggingIn ? (
                      <LoaderIcon className="size-5 animate-spin mx-auto" />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:flex md:w-1/2 h-full items-center justify-center p-8 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div className="flex flex-col items-center justify-between h-full py-8">
                <div className="flex-1 flex items-center">
                  <img
                    src="/login.png"
                    alt="Login illustration"
                    className="max-h-[250px] lg:max-h-[350px] w-auto object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl lg:text-2xl font-medium text-cyan-400">Connect anytime, anywhere</h3>
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
  );
}

export default LoginPage;