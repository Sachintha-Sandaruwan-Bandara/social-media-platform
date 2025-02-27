import React from "react";
import { UserPlus, MessageCircle, Circle } from "lucide-react";
import { useStore } from "../store/useStore";
import { Link } from "react-router-dom";
export function EnhancedRightSidebar() {
  const {
    currentUser,
    users
  } = useStore();
  const onlineFriends = users.filter(user => currentUser.friendIds.includes(user.id)).slice(0, 5);
  const suggestions = users.filter(user => !currentUser.friendIds.includes(user.id) && user.id !== currentUser.id).slice(0, 3);
  return <aside className="w-[320px] hidden xl:flex flex-col gap-4 sticky top-16 h-[calc(100vh-4rem)]">
      {/* Active Friends */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">Active Now</h2>
        <div className="space-y-4">
          {onlineFriends.map(friend => <div key={friend.id} className="flex items-center gap-3">
              <div className="relative">
                <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                <Circle className="w-3 h-3 absolute bottom-0 right-0 text-green-500 fill-current" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{friend.name}</h3>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </button>
            </div>)}
        </div>
        <Link to="/friends" className="block text-blue-600 hover:text-blue-700 text-sm mt-4">
          See all friends
        </Link>
      </div>
      {/* Friend Suggestions */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">People You May Know</h2>
        <div className="space-y-4">
          {suggestions.map(user => <div key={user.id} className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-500">
                  {user.friendIds.filter(id => currentUser.friendIds.includes(id)).length}{" "}
                  mutual friends
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </button>
            </div>)}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <img src={onlineFriends[0]?.avatar} alt="" className="w-8 h-8 rounded-full" />
            <p>
              <span className="font-medium">{onlineFriends[0]?.name}</span>{" "}
              updated their status
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img src={onlineFriends[1]?.avatar} alt="" className="w-8 h-8 rounded-full" />
            <p>
              <span className="font-medium">{onlineFriends[1]?.name}</span>{" "}
              liked a post
            </p>
          </div>
        </div>
      </div>
    </aside>;
}