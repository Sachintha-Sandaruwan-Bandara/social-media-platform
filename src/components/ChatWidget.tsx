import React, { useState } from "react";
import { MessageCircle, X, ChevronUp, Send } from "lucide-react";
import { useStore } from "../store/useStore";
export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const {
    currentUser,
    users
  } = useStore();
  const onlineFriends = users.filter(user => currentUser.friendIds.includes(user.id)).slice(0, 5);
  return <div className="fixed bottom-0 right-4 flex gap-3">
      {/* Chat List */}
      <div className="bg-white rounded-t-lg shadow-lg w-[280px]">
        <div className="p-3 border-b flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Chats</h3>
          </div>
          <ChevronUp className={`w-5 h-5 transition-transform ${isOpen ? "" : "rotate-180"}`} />
        </div>
        {isOpen && <div className="max-h-[400px] overflow-y-auto">
            {onlineFriends.map(friend => <div key={friend.id} className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3" onClick={() => setActiveChat(friend.id)}>
                <div className="relative">
                  <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 border-2 border-white" />
                </div>
                <div>
                  <h4 className="font-medium">{friend.name}</h4>
                  <p className="text-sm text-gray-500">Active now</p>
                </div>
              </div>)}
          </div>}
      </div>
      {/* Active Chat Window */}
      {activeChat && <div className="bg-white rounded-t-lg shadow-lg w-[320px]">
          <div className="p-3 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={users.find(u => u.id === activeChat)?.avatar} alt="" className="w-8 h-8 rounded-full" />
              <h3 className="font-semibold">
                {users.find(u => u.id === activeChat)?.name}
              </h3>
            </div>
            <button onClick={() => setActiveChat(null)} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="h-[300px] p-3 overflow-y-auto">
            <div className="space-y-3">
              <div className="flex gap-2">
                <img src={users.find(u => u.id === activeChat)?.avatar} alt="" className="w-8 h-8 rounded-full" />
                <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-[80%]">
                  <p>Hey, how are you?</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <div className="bg-blue-600 text-white rounded-2xl px-4 py-2 max-w-[80%]">
                  <p>I'm good, thanks! How about you?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 border-t">
            <form className="flex gap-2" onSubmit={e => {
          e.preventDefault();
          setMessage("");
        }}>
              <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Type a message..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="p-2 text-blue-600 hover:bg-gray-100 rounded-full">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>}
    </div>;
}