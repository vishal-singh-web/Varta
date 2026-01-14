import { XIcon, ChevronLeft } from "lucide-react"; // Added ChevronLeft
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  
  // Safe string comparison for MongoDB IDs
  const isOnline = onlineUsers.includes(selectedUser?._id?.toString());

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  if (!selectedUser) return null;

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 h-[72px] px-4 md:px-6 w-full">
      <div className="flex items-center space-x-2 md:space-x-3">
        
        {/* MOBILE BACK BUTTON: Visible only on small screens */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="md:hidden p-1 -ml-1 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* User Info Section */}
        <div className="flex items-center space-x-3">
          <div className={`avatar ${isOnline ? "online" : "offline"}`}>
            <div className="w-10 md:w-12 rounded-full ring-1 ring-slate-700">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.username} />
            </div>
          </div>

          <div>
            <h3 className="text-slate-200 font-medium text-sm md:text-base leading-tight">
              {selectedUser.username}
            </h3>
            <p className="text-slate-400 text-xs md:text-sm">
              {isOnline ? (
                <span className="text-cyan-400">Online</span>
              ) : (
                "Offline"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* DESKTOP CLOSE BUTTON: Hidden on mobile */}
      <button 
        onClick={() => setSelectedUser(null)}
        className="hidden md:block p-2 rounded-lg hover:bg-slate-700/50 transition-all group"
      >
        <XIcon className="w-5 h-5 text-slate-400 group-hover:text-rose-400" />
      </button>
    </div>
  );
}

export default ChatHeader;