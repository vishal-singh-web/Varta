import { useChatStore } from "../store/useChatStore"; // Ensure correct path
import BorderAnimated from "../components/BorderAnimated";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-6xl h-full max-h-[850px] flex items-center justify-center">
        <BorderAnimated>
          <div className="w-full h-full flex bg-slate-900/40 backdrop-blur-xl md:rounded-xl overflow-hidden">
            
            {/* LEFT SIDE: Sidebar */}
            {/* Logic: Hide on mobile if a user is selected */}
            <div className={`
              ${selectedUser ? "hidden" : "flex"} 
              md:flex w-full md:w-80 h-full flex-col border-r border-slate-600/30 bg-slate-800/20
            `}>
              <ProfileHeader />
              <ActiveTabSwitch />
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT SIDE: Chat Display */}
            {/* Logic: Hide on mobile if NO user is selected */}
            <div className={`
              ${!selectedUser ? "hidden" : "flex"} 
              md:flex flex-1 h-full flex-col bg-slate-900/20 relative overflow-hidden
            `}>
              {selectedUser===null ? (
                <NoConversationPlaceholder />
              ) : (
                <ChatContainer />
              )}
            </div>

          </div>
        </BorderAnimated>
      </div>
    </div>
  );
}

export default ChatPage;