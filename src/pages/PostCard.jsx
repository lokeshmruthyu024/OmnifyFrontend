import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const PostCard = ({ posts, handleViewPost }) => {
  return (
    <Box sx={{ mt: 4, px: { xs: 2, md: 6 } }}>
      {posts.map((blog, index) => (
        <Card
          key={index}
          sx={{
            mb: 3,
            cursor: 'pointer',
            borderRadius: 3,
            boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
              transform: 'translateY(-4px)',
            },
          }}
          onClick={() => handleViewPost(blog)}
        >
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 600 }}>
              {blog.user.fullName} @{blog.user.userName}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 700 }}>
              {blog.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#444',
                lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {blog.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostCard;
