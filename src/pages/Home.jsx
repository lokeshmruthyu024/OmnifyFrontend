// Home.jsx
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Fab,
  Modal,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Login from './auth/Login';
import Signup from './auth/Signup';
import CreatePost from './CreatePost';
import { usePostStore } from '../store/Posts';
import PostCard from './PostCard';
import Post from './Post';
import { toast } from 'react-toastify';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 500,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
};


const Home = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [viewPostOpen, setViewPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editPostOpen, setEditPostOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  const user = usePostStore((state) => state.user);
  const setUser = usePostStore((state) => state.setUser);
  const getAllPosts = usePostStore((state) => state.getAllPosts);
  const logoutUser = usePostStore((state) => state.logoutUser);
  const posts = usePostStore((state) => state.posts);
  const deletePost = usePostStore((state) => state.deletePost);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      toast.success('Logout successful!');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setViewPostOpen(true);
  };

  const handleCloseViewPost = () => {
    setSelectedPost(null);
    setViewPostOpen(false);
  };

  const handleEditPost = () => {
    setPostToEdit(selectedPost);
    setEditPostOpen(true);
    setViewPostOpen(false); // close view modal when editing
  };

  const handleDeletePost = async () => {
    if (!selectedPost) return;

    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(selectedPost._id);
        setViewPostOpen(false);
        setSelectedPost(null);
        toast.success('Post deleted successfully!')
      } catch (error) {
        console.error('Failed to delete post:', error);
        toast.error(error);
      }
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between',
            py: { xs: 1, sm: 0.5 },
            gap: { xs: 1, sm: 0 },
          }}
        >
          {/* Blogg app title - center aligned on all screens */}
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              width: '100%',
              order: { xs: 1, sm: 2 },
            }}
          >
            Blogg app
          </Typography>

          {/* Right Section: User Info and Buttons */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: { xs: '100%', sm: 'auto' },
              order: { xs: 2, sm: 3 },
            }}
          >
            {user ? (
              <>
                <Typography
                  variant="subtitle1"
                  sx={{ mr: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}
                >
                  {user.userName}
                </Typography>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => setLoginOpen(true)}>
                  Login
                </Button>
                <Button color="inherit" sx={{ ml: 2 }} onClick={() => setSignupOpen(true)}>
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>


      <Login
        open={loginOpen}
        handleClose={() => setLoginOpen(false)}
        handleSignupOpen={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }}
      />
      <Signup
        open={signupOpen}
        handleClose={() => setSignupOpen(false)}
        handleLoginOpen={() => {
          setSignupOpen(false);
          setLoginOpen(true);
        }}
      />

      <PostCard posts={posts} handleViewPost={handleViewPost} />

      <Modal open={viewPostOpen} onClose={handleCloseViewPost}>
        <Box sx={modalStyle}>
          <Post post={selectedPost} />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            {user && selectedPost?.user?.userName === user.userName && (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 3, boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)' }}
                  onClick={handleEditPost}
                >
                  Edit
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 3, borderWidth: 2 }}
                  onClick={handleDeletePost} // assuming you have this handler
                >
                  Delete
                </Button>
              </>
            )}

            <Button
              variant="outlined"
              color="primary"
              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, px: 3 }}
              onClick={handleCloseViewPost}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal for editing post */}
      <CreatePost
        open={editPostOpen}
        handleClose={() => setEditPostOpen(false)}
        editMode={true}
        postToEdit={postToEdit}
      />

      {/* Modal for creating new post */}
      <CreatePost
        open={createPostOpen}
        handleClose={() => setCreatePostOpen(false)}
        editMode={false}
        postToEdit={null}
      />


      {user && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setCreatePostOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </div>
  );
};

export default Home;
