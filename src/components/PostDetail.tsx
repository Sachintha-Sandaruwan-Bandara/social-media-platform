import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useStore } from "../store/useStore";
import { Post } from "./Post";
export function PostDetail() {
  const {
    postId
  } = useParams();
  const navigate = useNavigate();
  const {
    posts
  } = useStore();
  const post = posts.find(p => p.id === Number(postId));
  if (!post) {
    return <div>Post not found</div>;
  }
  return <main className="flex-1 max-w-[680px] mx-auto py-4">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900">
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Feed</span>
      </button>
      <Post {...post} isDetailView={true} />
    </main>;
}