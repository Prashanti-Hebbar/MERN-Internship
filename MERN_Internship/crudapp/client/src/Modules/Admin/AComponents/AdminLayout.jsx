import React from 'react'
import { ThemeProvider, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from './Sidebar'

const adminTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#9c27b0' },
    secondary: { main: '#00bcd4' },
    background: {
      default: '#101010',
      paper: '#181818',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
})

export default function AdminLayout({ children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const toggleDrawer = () => setMobileOpen((prev) => !prev)

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: 'linear-gradient(90deg, #7b1fa2 0%, #512da8 100%)',
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Admin Control Panel
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Security Level: High
            </Typography>
          </Toolbar>
        </AppBar>

        <Sidebar mobileOpen={mobileOpen} onMobileClose={toggleDrawer} />

        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: 'background.default', minHeight: '100vh' }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
