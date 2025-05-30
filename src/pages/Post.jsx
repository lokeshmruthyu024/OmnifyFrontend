import React, { useState } from 'react';
import { Typography, Box, Modal } from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95vw',
  maxWidth: 480,
  height: 'auto',
  maxHeight: '85vh',
  outline: 'none',
  boxShadow: 24,
  borderRadius: 2,
  bgcolor: 'background.paper',
  p: { xs: 1, sm: 2 },
  overflow: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};


const Post = ({ post }) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!post) return null;

  const handleImageClick = () => {
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };
  console.log(post);
  return (
    <Box
      sx={{
        maxWidth: { xs: '95vw', sm: 400, md: 450 },  // Further reduced width for PC screens
        mx: 'auto',
        px: { xs: 2, sm: 3 },
        py: 3,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        {post.title}
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        gutterBottom
        sx={{ fontStyle: 'italic' }}
      >
        By {post.user.fullName} @{post.user.userName}
      </Typography>
      {post.img && (
        <Box
          sx={{
            mb: 3,
            borderRadius: 2,
            overflow: 'hidden',
            cursor: 'pointer',
            maxHeight: 350,   // slightly taller image container
            width: '100%',
            '& img': { width: '100%', height: 'auto', display: 'block' },
          }}
          onClick={handleImageClick}
        >
          <img src={post.img} alt={post.title} />
        </Box>
      )}
      {post.description.split('\n').map((line, idx) => (
        <Typography
          key={idx}
          variant="body1"
          paragraph
          sx={{ lineHeight: 1.7, color: '#333' }}
        >
          {line}
        </Typography>
      ))}

      <Modal open={previewOpen} onClose={handleClosePreview} closeAfterTransition>
        <Box sx={modalStyle}>
          <img
            src={post.img}
            alt={post.title}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: 8,
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Post;
