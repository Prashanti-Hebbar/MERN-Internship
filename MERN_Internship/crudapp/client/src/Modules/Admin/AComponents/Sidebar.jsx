import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Typography, Collapse, Avatar, Divider,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import CategoryIcon from '@mui/icons-material/Category'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ViewListIcon from '@mui/icons-material/ViewList'
import LogoutIcon from '@mui/icons-material/Logout'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

const drawerWidth = 260

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
]

const productItems = [
  { text: 'Add Product', icon: <AddCircleIcon />, path: '/admin/products/add' },
  { text: 'View Products', icon: <ViewListIcon />, path: '/admin/products' },
]

const categoryItems = [
  { text: 'Add Category', icon: <AddCircleIcon />, path: '/admin/category/add' },
  { text: 'View Category', icon: <ViewListIcon />, path: '/admin/category/view' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn')
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path
  const isCategoryActive = categoryItems.some((item) => location.pathname === item.path)
  const isProductActive = productItems.some((item) => location.pathname === item.path)

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 1, bgcolor: '#fff', color: '#667eea' }}>
          <AdminPanelSettingsIcon sx={{ fontSize: 30 }} />
        </Avatar>
        <Typography variant="h6" fontWeight={700}>
          Admin Panel
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                bgcolor: isActive(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
              }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setProductOpen(!productOpen)}
            sx={{
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              bgcolor: isProductActive ? 'rgba(255,255,255,0.2)' : 'transparent',
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
            {productOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={productOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {productItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    pl: 4,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                    bgcolor: isActive(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setCategoryOpen(!categoryOpen)}
            sx={{
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              bgcolor: isCategoryActive ? 'rgba(255,255,255,0.2)' : 'transparent',
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Category" />
            {categoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {categoryItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    pl: 4,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                    bgcolor: isActive(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
                  }}
                >
                  <ListItemIcon sx={{ color: '#fff' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 1 }} />

        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}