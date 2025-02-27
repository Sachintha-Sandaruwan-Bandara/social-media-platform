import {create} from 'zustand';
interface User {
  id: string;
  name: string;
  avatar: string;
  coverPhoto?: string;
  bio?: string;
  location?: string;
  friendIds: string[];
  pendingFriendIds: string[];
}
interface Notification {
  id: string;
  type: 'friendRequest' | 'like' | 'comment' | 'share';
  fromUser: {
    id: string;
    name: string;
    avatar: string;
  };
  read: boolean;
  timestamp: string;
  postId?: number;
}
interface Comment {
  id: string;
  userId: string;
  content: string;
  author: string;
  avatar: string;
  timeAgo: string;
}
interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  timeAgo: string;
  likedBy: string[];
}
interface Store {
  currentUser: User;
  users: User[];
  posts: Post[];
  notifications: Notification[];
  addPost: (content: string, image?: string) => void;
  toggleLike: (postId: number) => void;
  addComment: (postId: number, content: string) => void;
  sharePost: (postId: number) => void;
  sendFriendRequest: (userId: string) => void;
  acceptFriendRequest: (userId: string) => void;
  declineFriendRequest: (userId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  getUserPosts: (userId: string) => Post[];
  getUser: (userId: string) => User | undefined;
}
export const useStore = create<Store>((set, get) => ({
  currentUser: {
    id: '1',
    name: 'Current User',
    avatar: 'https://i.pravatar.cc/100?img=3',
    coverPhoto: 'https://images.unsplash.com/photo-1508247967583-7d982ea01526',
    bio: 'Living life to the fullest! 🌟',
    location: 'New York, NY',
    friendIds: ['2', '3'],
    pendingFriendIds: []
  },
  users: [{
    id: '2',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/100?img=1',
    friendIds: ['1'],
    pendingFriendIds: []
  }, {
    id: '3',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/100?img=2',
    friendIds: ['1'],
    pendingFriendIds: []
  }, {
    id: '4',
    name: 'Sarah Wilson',
    avatar: 'https://i.pravatar.cc/100?img=4',
    friendIds: [],
    pendingFriendIds: []
  }, {
    id: '5',
    name: 'Mike Johnson',
    avatar: 'https://i.pravatar.cc/100?img=5',
    friendIds: [],
    pendingFriendIds: []
  }],
  posts: [{
    id: 1,
    author: 'John Doe',
    avatar: 'https://i.pravatar.cc/100?img=1',
    content: 'Just had an amazing weekend! 🎉',
    likes: 5,
    comments: [],
    shares: 2,
    timeAgo: '2h ago',
    likedBy: []
  }, {
    id: 2,
    author: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/100?img=2',
    content: 'Check out this beautiful sunset! 🌅',
    image: 'https://images.unsplash.com/photo-1502790671504-542ad42d5189',
    likes: 10,
    comments: [],
    shares: 3,
    timeAgo: '5h ago',
    likedBy: []
  }],
  notifications: [{
    id: '1',
    type: 'friendRequest',
    fromUser: {
      id: '4',
      name: 'Sarah Wilson',
      avatar: 'https://i.pravatar.cc/100?img=4'
    },
    read: false,
    timestamp: '2h ago'
  }, {
    id: '2',
    type: 'like',
    fromUser: {
      id: '2',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/100?img=1'
    },
    postId: 1,
    read: false,
    timestamp: '4h ago'
  }],
  addPost: (content, image) => set(state => ({
    posts: [{
      id: Date.now(),
      author: state.currentUser.name,
      avatar: state.currentUser.avatar,
      content,
      image,
      likes: 0,
      comments: [],
      shares: 0,
      timeAgo: 'Just now',
      likedBy: []
    }, ...state.posts]
  })),
  toggleLike: postId => set(state => ({
    posts: state.posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likedBy.includes(state.currentUser.id);
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedBy: isLiked ? post.likedBy.filter(id => id !== state.currentUser.id) : [...post.likedBy, state.currentUser.id]
        };
      }
      return post;
    })
  })),
  addComment: (postId, content) => set(state => ({
    posts: state.posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now().toString(),
            userId: state.currentUser.id,
            content,
            author: state.currentUser.name,
            avatar: state.currentUser.avatar,
            timeAgo: 'Just now'
          }]
        };
      }
      return post;
    })
  })),
  sharePost: postId => set(state => ({
    posts: state.posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          shares: post.shares + 1
        };
      }
      return post;
    })
  })),
  sendFriendRequest: userId => set(state => ({
    users: state.users.map(user => user.id === userId ? {
      ...user,
      pendingFriendIds: [...user.pendingFriendIds, state.currentUser.id]
    } : user),
    notifications: [{
      id: Date.now().toString(),
      type: 'friendRequest',
      fromUser: {
        id: state.currentUser.id,
        name: state.currentUser.name,
        avatar: state.currentUser.avatar
      },
      read: false,
      timestamp: 'Just now'
    }, ...state.notifications]
  })),
  acceptFriendRequest: userId => set(state => ({
    currentUser: {
      ...state.currentUser,
      friendIds: [...state.currentUser.friendIds, userId],
      pendingFriendIds: state.currentUser.pendingFriendIds.filter(id => id !== userId)
    },
    users: state.users.map(user => user.id === userId ? {
      ...user,
      friendIds: [...user.friendIds, state.currentUser.id]
    } : user)
  })),
  declineFriendRequest: userId => set(state => ({
    currentUser: {
      ...state.currentUser,
      pendingFriendIds: state.currentUser.pendingFriendIds.filter(id => id !== userId)
    }
  })),
  markNotificationAsRead: notificationId => set(state => ({
    notifications: state.notifications.map(notification => notification.id === notificationId ? {
      ...notification,
      read: true
    } : notification)
  })),
  getUserPosts: userId => {
    const state = get();
    return state.posts.filter(post => {
      const postUser = state.users.find(user => user.name === post.author);
      return postUser?.id === userId;
    });
  },
  getUser: userId => {
    const state = get();
    return state.users.find(user => user.id === userId);
  }
}));