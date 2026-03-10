import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import Grid from '@mui/material/Grid'
import PeopleIcon from '@mui/icons-material/People'
import CategoryIcon from '@mui/icons-material/Category'
import BookOnlineIcon from '@mui/icons-material/BookOnline'

// dashboard counts are fetched from the server to make the UI dynamic
const statCards = [
  {
    title: 'Users',
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    gradient: 'linear-gradient(135deg, #1A73E8 0%, #49a3f1 100%)',
    fetchCount: async () => {
      const res = await fetch('/user/getUser');
      const data = await res.json();
      return Array.isArray(data.allusers) ? data.allusers.length : 0;
    }
  },
  {
    title: 'Categories',
    icon: <CategoryIcon sx={{ fontSize: 40 }} />,
    gradient: 'linear-gradient(135deg, #43A047 0%, #66BB6A 100%)',
    fetchCount: () => {
      const stored = JSON.parse(localStorage.getItem('categories')) || [];
      return stored.length;
    }
  },
  {
    title: 'Products',
    icon: <BookOnlineIcon sx={{ fontSize: 40 }} />,
    gradient: 'linear-gradient(135deg, #FB8C00 0%, #FFA726 100%)',
    fetchCount: async () => {
      const res = await fetch('/product/getProducts');
      const data = await res.json();
      return Array.isArray(data.products) ? data.products.length : 0;
    }
  },
];

export default function AHome() {
  const [counts, setCounts] = React.useState({});

  React.useEffect(() => {
    // fetch each card's count (if async)
    statCards.forEach(async (card) => {
      try {
        const value = await card.fetchCount();
        setCounts((prev) => ({ ...prev, [card.title]: value }));
      } catch (e) {
        console.error('count error', e);
      }
    });
  }, []);

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Welcome back, Admin! Here's what's happening.
      </Typography>

      <Grid container spacing={3}>
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                background: card.gradient,
                color: '#fff',
                minHeight: 150,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="h3" fontWeight={700}>
                    {counts[card.title] ?? '...'}
                  </Typography>
                </Box>
                <Box sx={{ opacity: 0.8 }}>{card.icon}</Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Quick Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage your users, categories, and products from this dashboard.
          Use the sidebar to navigate between different sections.
        </Typography>
      </Box>
    </Box>
  )
}
