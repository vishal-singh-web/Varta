import { useChatStore } from "../store/useChatStore"; // Ensure correct path
import BorderAnimated from "../components/BorderAnimated";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full h-screen flex items-center justify-center p-4 bg-slate-900 overflow-hidden">
      <div className="relative w-full max-w-6xl h-[90vh] flex">
        <BorderAnimated>
          <div className="w-full h-full flex flex-col md:flex-row bg-slate-900/50 backdrop-blur-xl rounded-xl overflow-hidden">
            
            {/* LEFT SIDE: Sidebar (Width fixed at 320px/w-80) */}
            <div className="w-80 h-full flex flex-col border-r border-slate-600/30 bg-slate-800/20">
              <ProfileHeader />
              <ActiveTabSwitch />

              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {activeTab === "chats" ? <ChatsList /> : <ContactList />}
              </div>
            </div>

            {/* RIGHT SIDE: Chat Display */}
            <div className="flex-1 h-full flex flex-col bg-slate-900/20 relative overflow-hidden">
              {selectedUser ? (
                <ChatContainer />
              ) : (
                <NoConversationPlaceholder />
              )}
            </div>

          </div>
        </BorderAnimated>
      </div>
    </div>
  );
}

export default ChatPage;