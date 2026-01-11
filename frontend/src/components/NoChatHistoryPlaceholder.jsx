import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center p-6">
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-5">
        <MessageCircleIcon className="size-8 text-cyan-400" />
      </div>
      <h3 className="text-lg font-medium text-slate-200 mb-2">
        Start your conversation with {name}
      </h3>
      <p className="text-slate-400 text-sm max-w-xs mb-6">
        This is the beginning of your chat history.
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
         <button className="px-3 py-1.5 text-xs bg-cyan-500/10 text-cyan-400 rounded-full">👋 Say Hello</button>
         <button className="px-3 py-1.5 text-xs bg-cyan-500/10 text-cyan-400 rounded-full">🤝 How are you?</button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;