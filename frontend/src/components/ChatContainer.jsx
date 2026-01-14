import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading,subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  // 1. Only fetch if the user ID actually exists
  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
    subscribeToMessages();

    return ()=> unsubscribeFromMessages();
  }, [selectedUser?._id, getMessagesByUserId,subscribeToMessages,unsubscribeFromMessages]);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // 2. STAGE 1: If we are loading and have no messages yet, show Skeleton
  if (isMessagesLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-full bg-slate-900 overflow-hidden">
        <ChatHeader />
        <div className="flex-1 p-4 overflow-y-auto">
          <MessagesLoadingSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-slate-900 overflow-hidden">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar min-h-0">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto h-full">
          {messages.length > 0 ? (
            <>
              {messages.map((msg) => (
                <div 
                  key={msg._id} 
                  className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                >
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border border-slate-700">
                      <img
                        src={msg.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}
                        alt="profile"
                      />
                    </div>
                  </div>

                  <div className={`chat-bubble flex flex-col gap-2 p-3 shadow-md min-w-[50px] ${
                    msg.senderId === authUser._id ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200"
                  }`}>
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Attachment"
                        className="rounded-lg max-h-60 w-full object-contain bg-black/20"
                        onLoad={scrollToBottom}
                      />
                    )}
                    {msg.text && <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>}
                    <div className="text-[10px] opacity-50 self-end mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} className="h-2 w-full" />
            </>
          ) : (
            /* 3. STAGE 2: ONLY show placeholder if NOT loading AND length is 0 */
            !isMessagesLoading && (
              <div className="h-full flex items-center justify-center">
                <NoChatHistoryPlaceholder name={selectedUser?.username} />
              </div>
            )
          )}
        </div>
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;