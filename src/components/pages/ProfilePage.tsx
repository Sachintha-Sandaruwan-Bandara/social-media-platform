import React from "react";
import { useParams } from "react-router-dom";
import { UserPlus, MessageCircle, Mail, MoreHorizontal } from "lucide-react";
import { useStore } from "../../store/useStore";
import { Post } from "../Post";
export function ProfilePage() {
  const {
    userId
  } = useParams();
  const {
    currentUser,
    getUser,
    getUserPosts,
    sendFriendRequest
  } = useStore();
  const user = userId ? getUser(userId) : currentUser;
  const posts = userId ? getUserPosts(userId) : getUserPosts(currentUser.id);
  if (!user) return <div>User not found</div>;
  const isCurrentUser = user.id === currentUser.id;
  const isFriend = currentUser.friendIds.includes(user.id);
  return <main className="flex-1 max-w-[940px] mx-auto">
      <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
        <div className="h-[300px] overflow-hidden">
          <img src={user.coverPhoto || "https://images.unsplash.com/photo-1508247967583-7d982ea01526"} alt="Cover" className="w-full h-full object-cover" />
        </div>
        <div className="px-4 pb-4">
          <div className="flex items-end -mt-8 justify-between">
            <div className="flex items-end">
              <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white" />
              <div className="ml-4 mb-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.friendIds.length} friends</p>
              </div>
            </div>
            {!isCurrentUser && <div className="flex gap-2">
                {!isFriend && <button onClick={() => sendFriendRequest(user.id)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <UserPlus className="w-5 h-5" />
                    Add Friend
                  </button>}
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  <MessageCircle className="w-5 h-5" />
                  Message
                </button>
              </div>}
          </div>
          {user.bio && <p className="mt-4">{user.bio}</p>}
        </div>
      </div>
      <div className="space-y-4">
        {posts.map(post => <Post key={post.id} {...post} />)}
      </div>
    </main>;
}