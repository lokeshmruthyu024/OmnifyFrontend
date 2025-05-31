import { create } from 'zustand';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const usePostStore = create((set) => ({
  posts: [],
  user: JSON.parse(localStorage.getItem('authUser')) || null,
  setUser: (userData) => set({ user: userData }),
  setPosts: (posts) => set({ posts }),

  loginUser: async (userName, password) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
        credentials: 'include'
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.message || 'Login failed');

      localStorage.setItem('authUser', JSON.stringify(data));
      set({ user: data });

      return data;
    } catch (error) {
      console.error('Login Error:', error.message);
      throw error;
    }
  },

  signupUser: async (fullName, userName, email, password) => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, userName, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.message || 'Signup failed');

      return data;
    } catch (error) {
      console.error('Signup Error:', error.message);
      throw error;
    }
  },

  logoutUser: async () => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.message || 'Logout failed');

      localStorage.removeItem('authUser');
      set({ user: null });
      return data;
    } catch (error) {
      console.error('Logout Error:', error.message);
      throw error;
    }
  },

  getUser: async () => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/getme`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get User Error:', error.message);
      throw error;
    }
  },

  createPost: async (post) => {
    try {
      if (!post.title && !post.description && !post.img) {
        throw new Error('Post must have a title or an image');
      }

      const response = await fetch(`${baseUrl}/api/posts/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(post),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.message || 'Failed to create post');

      set((state) => ({ posts: [data, ...state.posts] }));
    } catch (error) {
      console.error('Create Post Error:', error.message);
    }
  },

  getAllPosts: async () => {
    try {
      const response = await fetch(`${baseUrl}/api/posts`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || data.error || 'Failed to fetch posts');

      set({ posts: data });
    } catch (error) {
      console.error('Get All Posts Error:', error.message);
    }
  },

  getPost: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/posts/${id}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || data.error || 'Failed to fetch post');

      return data;
    } catch (error) {
      console.error('Get Post Error:', error.message);
      throw error;
    }
  },

  editPost: async (id, updatedPost) => {
    try {
      if (!updatedPost.title && !updatedPost.description && !updatedPost.img) {
        throw new Error('Post must have a title or an image');
      }

      const response = await fetch(`${baseUrl}/api/posts/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedPost),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error || 'Failed to edit post');

      set((state) => ({
        posts: state.posts.map((post) => (post._id === id ? data : post)),
      }));
    } catch (error) {
      console.error('Edit Post Error:', error.message);
    }
  },

  deletePost: async (id) => {
    try {
      const response = await fetch(`${baseUrl}/api/posts/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error || 'Failed to delete post');

      set((state) => ({
        posts: state.posts.filter((post) => post._id !== id),
      }));
    } catch (error) {
      console.error('Delete Post Error:', error.message);
    }
  },
}));
