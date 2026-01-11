import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast"

export const useAuthStore = create((set)=>({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    onlineUsers:[],

    checkAuth: async ()=>{
        try {
            const res = await axiosInstance.get('/v1/auth/checkUser');
            set({authUser:res.data.data});
        } catch (error) {
            console.log("Error in authUser",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },
    signUp: async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post('/v1/auth/register',data);
            set({authUser:res.data.data})
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in signUp:",error);
        }finally{
            set({isSigningUp: false})
        }
    },
    login: async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post('/v1/auth/login',data);
            set({authUser:res.data.data})
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in signUp:",error);
        }finally{
            set({isLoggingIn: false})
        }
    },
    logout:async()=>{
        try {
            const res = await axiosInstance.get('/v1/auth/logout');
            set({authUser:""});
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in logout:",error);
        }
    },
    updateProfile:async(data)=>{
        try {
            const res = await axiosInstance.put('/v1/auth/update-profile',data);
            set({authUser:res.data});
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in updateProfile:",error);
        }
    }
}))