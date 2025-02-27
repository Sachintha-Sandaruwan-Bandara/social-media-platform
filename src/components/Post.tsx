import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Share2, MoreHorizontal, Send } from "lucide-react";
import { useStore } from "../store/useStore";
interface PostProps {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Array<{
    id: string;
    content: string;
    author: string;
    avatar: string;
    timeAgo: string;
  }>;
  shares: number;
  timeAgo: string;
  likedBy: string[];
}
export function Post({
  id,
  author,
  avatar,
  content,
  image,
  likes,
  comments,
  shares,
  timeAgo,
  likedBy,
  isDetailView = false
}: PostProps & {
  isDetailView?: boolean;
}) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const {
    currentUser,
    toggleLike,
    addComment,
    sharePost
  } = useStore();
  const isLiked = likedBy.includes(currentUser.id);
  const navigate = useNavigate();
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(id, newComment);
      setNewComment("");
    }
  };
  const handleCommentClick = () => {
    if (!isDetailView) {
      navigate(`/post/${id}`);
    } else {
      setShowComments(!showComments);
    }
  };
  return <article className="bg-white rounded-lg shadow">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={avatar} alt={author} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-semibold">{author}</h3>
              <p className="text-gray-500 text-sm">{timeAgo}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <p className="mt-3">{content}</p>
      </div>
      {image && <img src={image} alt="" className="w-full max-h-[500px] object-cover" />}
      <div className="p-4">
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <span>{likes} likes</span>
          <span>•</span>
          <span>{comments.length} comments</span>
          <span>•</span>
          <span>{shares} shares</span>
        </div>
        <div className="flex gap-2 border-t pt-3">
          <button onClick={() => toggleLike(id)} className={`flex items-center gap-2 ${isLiked ? "text-blue-600" : "text-gray-600"} hover:bg-gray-100 flex-1 justify-center py-2 rounded-lg`}>
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            <span>Like</span>
          </button>
          <button onClick={handleCommentClick} className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center py-2 rounded-lg">
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
          <button onClick={() => sharePost(id)} className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 flex-1 justify-center py-2 rounded-lg">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
        {(isDetailView || showComments) && <div className="mt-4 space-y-4">
            {comments.map(comment => <div key={comment.id} className="flex gap-3">
                <img src={comment.avatar} alt={comment.author} className="w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <p className="font-medium">{comment.author}</p>
                    <p>{comment.content}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {comment.timeAgo}
                  </p>
                </div>
              </div>)}
            <form onSubmit={handleAddComment} className="flex gap-2 mt-4">
              <img src={currentUser.avatar} alt="Your avatar" className="w-8 h-8 rounded-full" />
              <div className="flex-1 flex gap-2">
                <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." className="flex-1 bg-gray-100 rounded-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" disabled={!newComment.trim()} className="p-2 text-blue-600 hover:bg-gray-100 rounded-full disabled:opacity-50">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>}
      </div>
    </article>;
}