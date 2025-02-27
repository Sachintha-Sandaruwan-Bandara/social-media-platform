import React from "react";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { LeftSidebar } from "./components/LeftSidebar";
import { MainFeed } from "./components/MainFeed";
import { PostDetail } from "./components/PostDetail";
import { ProfilePage } from "./components/pages/ProfilePage";
import { FriendsPage } from "./components/pages/FriendsPage";
import { NotificationsPage } from "./components/pages/NotificationsPage";
import { EnhancedRightSidebar } from "./components/EnhancedRightSidebar";
import { ChatWidget } from "./components/ChatWidget";
export function App() {
  return <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="flex w-full max-w-[1920px] mx-auto px-4 gap-4 pt-16 relative">
          <LeftSidebar />
          <Routes>
            <Route path="/" element={<MainFeed />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/profile/:userId?" element={<ProfilePage />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
          <EnhancedRightSidebar />
          <ChatWidget />
        </div>
      </div>
    </Router>;
}