import React, { useState } from "react";
import { Image, Video, Smile } from "lucide-react";
import { useStore } from "../store/useStore";
export function CreatePost() {
  const [content, setContent] = useState("");
  const {
    currentUser,
    addPost
  } = useStore();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addPost(content);
      setContent("");
    }
  };
  return <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4">
      <div className="flex gap-4">
        <img src={currentUser.avatar} alt="Your avatar" className="w-10 h-10 rounded-full" />
        <input type="text" value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind?" className="flex-1 bg-gray-100 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="flex gap-4 mt-4 pt-4 border-t">
        <button type="button" className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center py-2 rounded-lg">
          <Image className="w-5 h-5" />
          <span>Photo</span>
        </button>
        <button type="button" className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center py-2 rounded-lg">
          <Video className="w-5 h-5" />
          <span>Video</span>
        </button>
        <button type="button" className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center py-2 rounded-lg">
          <Smile className="w-5 h-5" />
          <span>Feeling</span>
        </button>
        <button type="submit" disabled={!content.trim()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
          Post
        </button>
      </div>
    </form>;
}