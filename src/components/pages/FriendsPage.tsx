import React from "react";
import { UserPlus, UserMinus, Check, X } from "lucide-react";
import { useStore } from "../../store/useStore";
export function FriendsPage() {
  const {
    currentUser,
    users,
    acceptFriendRequest,
    declineFriendRequest,
    sendFriendRequest
  } = useStore();
  const friends = users.filter(user => currentUser.friendIds.includes(user.id));
  const pendingRequests = users.filter(user => currentUser.pendingFriendIds.includes(user.id));
  const suggestions = users.filter(user => !currentUser.friendIds.includes(user.id) && !currentUser.pendingFriendIds.includes(user.id) && user.id !== currentUser.id);
  return <main className="flex-1 max-w-[680px] mx-auto py-4">
      {pendingRequests.length > 0 && <section className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Friend Requests</h2>
          <div className="space-y-4">
            {pendingRequests.map(user => <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {user.friendIds.filter(id => currentUser.friendIds.includes(id)).length}{" "}
                      mutual friends
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => acceptFriendRequest(user.id)} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Check className="w-5 h-5" />
                  </button>
                  <button onClick={() => declineFriendRequest(user.id)} className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>)}
          </div>
        </section>}
      <section className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">People You May Know</h2>
        <div className="space-y-4">
          {suggestions.map(user => <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {user.friendIds.filter(id => currentUser.friendIds.includes(id)).length}{" "}
                    mutual friends
                  </p>
                </div>
              </div>
              <button onClick={() => sendFriendRequest(user.id)} className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                <UserPlus className="w-5 h-5" />
                <span>Add Friend</span>
              </button>
            </div>)}
        </div>
      </section>
    </main>;
}