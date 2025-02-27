import React from "react";
import { UserPlus } from "lucide-react";
export function RightSidebar() {
  const suggestions = [{
    id: 1,
    name: "Sarah Wilson",
    avatar: "https://i.pravatar.cc/100?img=4",
    mutualFriends: 3
  }, {
    id: 2,
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/100?img=5",
    mutualFriends: 5
  }, {
    id: 3,
    name: "Emily Davis",
    avatar: "https://i.pravatar.cc/100?img=6",
    mutualFriends: 2
  }];
  return <aside className="w-[280px] hidden xl:block sticky top-16 h-[calc(100vh-4rem)]">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">People you may know</h2>
        <div className="space-y-4">
          {suggestions.map(suggestion => <div key={suggestion.id} className="flex items-center gap-3">
              <img src={suggestion.avatar} alt={suggestion.name} className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <h3 className="font-medium">{suggestion.name}</h3>
                <p className="text-sm text-gray-500">
                  {suggestion.mutualFriends} mutual friends
                </p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </button>
            </div>)}
        </div>
      </div>
    </aside>;
}