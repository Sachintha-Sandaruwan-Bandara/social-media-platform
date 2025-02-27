import React from "react";
import { Heart, MessageCircle, UserPlus, Share2 } from "lucide-react";
import { useStore } from "../../store/useStore";
export function NotificationsPage() {
  const {
    notifications,
    markNotificationAsRead
  } = useStore();
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "comment":
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case "friendRequest":
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case "share":
        return <Share2 className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };
  return <main className="flex-1 max-w-[680px] mx-auto py-4">
      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-4 border-b">Notifications</h2>
        <div className="divide-y">
          {notifications.map(notification => <div key={notification.id} className={`p-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`} onClick={() => markNotificationAsRead(notification.id)}>
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <img src={notification.fromUser.avatar} alt="" className="w-8 h-8 rounded-full" />
                  <span className="font-medium">
                    {notification.fromUser.name}
                  </span>
                </div>
                <p className="text-gray-600">
                  {notification.type === "like" && "liked your post"}
                  {notification.type === "comment" && "commented on your post"}
                  {notification.type === "friendRequest" && "sent you a friend request"}
                  {notification.type === "share" && "shared your post"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {notification.timestamp}
                </p>
              </div>
              {!notification.read && <div className="w-3 h-3 bg-blue-600 rounded-full"></div>}
            </div>)}
        </div>
      </div>
    </main>;
}