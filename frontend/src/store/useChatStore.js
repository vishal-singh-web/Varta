import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  SearchedContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  toggleSound: () => {
    const newValue = !get().isSoundEnabled;
    localStorage.setItem("isSoundEnabled", newValue);
    set({ isSoundEnabled: newValue });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (user) => {
  const currentSelected = get().selectedUser;
  
  // ONLY reset messages if it's a DIFFERENT user
  if (currentSelected?._id !== user._id) {
    set({ selectedUser: user, messages: [] });
  } else {
    // If it's the same user, just keep everything as is
    set({ selectedUser: user });
  }
},

  getSearchedContacts: async (str) => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/v1/msg/search', { params: { q: str } });
      set({ SearchedContacts: res.data.data || [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Search failed");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/v1/msg/chats');
      set({ chats: res.data.data || [] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
  // Do NOT do set({ messages: [] }) here
  set({ isMessagesLoading: true });
  try {
    const res = await axiosInstance.get(`v1/msg/chats/${userId}`);
    const fetchedData = res.data?.data || res.data;
    set({ messages: Array.isArray(fetchedData) ? fetchedData : [] });
  } finally {
    set({ isMessagesLoading: false });
  }
},
  sendMessage:async(data)=>{
    const {selectedUser,messages} = get();
    try {
      const res = await axiosInstance.post(`/v1/msg/send/${selectedUser._id}`,data);
      set({messages:[...messages,res.data.data]});
    } catch (error) {
       toast.error("Failed to send message");
    }
  },
  subscribeToMessages: async () => { },
  unsubscribeFromMessages: async () => { }
}));