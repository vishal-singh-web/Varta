import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  // Added selectedUser to the destructuring
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2"> {/* Container for better spacing */}
      {chats.map((chat) => (
        <div
          key={chat._id}
          className={`p-4 rounded-xl cursor-pointer transition-all flex items-center gap-3 border
            ${selectedUser?._id === chat._id 
              ? "bg-cyan-500/20 border-cyan-500/50 ring-1 ring-cyan-500/20" 
              : "bg-slate-800/40 border-transparent hover:bg-slate-800/60"
            }`}
          onClick={() => setSelectedUser(chat)}
        >
          {/* Avatar with Online/Offline Ring */}
          <div className={`avatar ${onlineUsers.includes(chat._id) ? "online" : "offline"}`}>
            <div className="size-12 rounded-full ring-2 ring-slate-700/50">
              <img 
                src={chat.profilePic || "/avatar.png"} 
                alt={chat.username} 
                className="object-cover"
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium truncate ${
              selectedUser?._id === chat._id ? "text-cyan-400" : "text-slate-200"
            }`}>
              {chat.username}
            </h4>
            <p className="text-xs text-slate-500 truncate">
              {onlineUsers.includes(chat._id) ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatsList;