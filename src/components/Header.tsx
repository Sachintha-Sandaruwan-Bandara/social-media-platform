import React from "react";
import { Search, Home, Users, MessageSquare, Bell, Menu, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
export function Header() {
  const navigate = useNavigate();
  const {
    notifications
  } = useStore();
  const unreadNotifications = notifications.filter(n => !n.read).length;
  return <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="flex items-center justify-between h-14 px-4 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-blue-600 text-2xl font-bold">
            social
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search..." className="bg-gray-100 pl-10 pr-4 py-2 rounded-full text-sm w-[240px]" />
          </div>
        </div>
        <nav className="flex items-center gap-2">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full">
            <Home className="w-6 h-6 text-gray-600" />
          </Link>
          <Link to="/friends" className="p-2 hover:bg-gray-100 rounded-full">
            <Users className="w-6 h-6 text-gray-600" />
          </Link>
          <Link to="/notifications" className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6 text-gray-600" />
            {unreadNotifications > 0 && <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {unreadNotifications}
              </span>}
          </Link>
          <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
            <User className="w-6 h-6 text-gray-600" />
          </Link>
        </nav>
      </div>
    </header>;
}