import React from "react";
import { User, Users, Bookmark, Calendar, Settings } from "lucide-react";
export function LeftSidebar() {
  return <aside className="w-[280px] hidden lg:block sticky top-16 h-[calc(100vh-4rem)]">
      <nav className="space-y-1 py-4">
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
          <Users className="w-5 h-5" />
          <span>Friends</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
          <Bookmark className="w-5 h-5" />
          <span>Saved</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
          <Calendar className="w-5 h-5" />
          <span>Events</span>
        </a>
        <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </a>
      </nav>
    </aside>;
}