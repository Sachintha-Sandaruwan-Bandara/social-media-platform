import React from "react";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
import { useStore } from "../store/useStore";
export function MainFeed() {
  const {
    posts
  } = useStore();
  return <main className="flex-1 max-w-[680px] mx-auto py-4">
      <CreatePost />
      <div className="space-y-4 mt-4">
        {posts.map(post => <Post key={post.id} {...post} />)}
      </div>
    </main>;
}