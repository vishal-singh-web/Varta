import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { Search } from "lucide-react";

function ContactList() {
  const { getSearchedContacts, SearchedContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize list
  useEffect(() => {
    getSearchedContacts('');
  }, [getSearchedContacts]);

  // Handle Search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    getSearchedContacts(value);
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Search Bar Section */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="size-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 bg-slate-800/40 border border-slate-700/50 rounded-xl 
                     text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 
                     focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm"
        />
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {isUsersLoading ? (
          <UsersLoadingSkeleton />
        ) : SearchedContacts?.length > 0 ? (
          SearchedContacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-cyan-500/5 p-4 rounded-xl cursor-pointer hover:bg-cyan-500/15 
                         border border-transparent hover:border-cyan-500/20 transition-all 
                         flex items-center gap-3 group"
              onClick={() => setSelectedUser(contact)}
            >
              <div className={`avatar ${onlineUsers.includes(contact._id) ? "online" : "offline"}`}>
                <div className="size-11 rounded-full ring-1 ring-slate-700 group-hover:ring-cyan-500/30 transition-all">
                  <img src={contact.profilePic || "/avatar.png"} alt={contact.username} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-slate-200 font-medium truncate">{contact.username}</h4>
                <p className="text-xs text-slate-500 truncate">
                   {onlineUsers.includes(contact._id) ? "Active now" : "Offline"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-slate-500 text-sm">No contacts found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactList;