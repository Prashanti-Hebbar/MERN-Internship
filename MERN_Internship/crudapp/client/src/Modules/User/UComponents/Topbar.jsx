import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
  { name: "Shop", path: "/user" },
  { name: "Products", path: "/user/products" },
  { name: "About", path: "/user/about" },
];

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("UserToken");

  const settings = token
    ? [
        { name: "Profile", path: "/user/myprofile" },
        { name: "Logout", path: "/login" },
      ]
    : [
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
      ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navTimeout = React.useRef();
  const userTimeout = React.useRef();

  const openNav = (e) => {
    clearTimeout(navTimeout.current);
    setAnchorElNav(e.currentTarget);
  };

  const closeNav = () => {
    navTimeout.current = setTimeout(() => {
      setAnchorElNav(null);
    }, 150);
  };

  const openUser = (e) => {
    clearTimeout(userTimeout.current);
    setAnchorElUser(e.currentTarget);
  };

  const closeUser = () => {
    userTimeout.current = setTimeout(() => {
      setAnchorElUser(null);
    }, 150);
  };

  const handleSettings = (item) => {
    if (item.name === "Logout") {
      localStorage.removeItem("UserToken");
      navigate("/login");
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 6 } }}>
        {/* LOGO */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#111",
            cursor: "pointer",
          }}
          onClick={() => navigate("/user")}
        >
          CartZen
        </Typography>

        {/* DESKTOP MENU */}
        <Box
          sx={{
            ml: 5,
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          {pages.map((page) => (
            <Button
              key={page.name}
              onClick={() => navigate(page.path)}
              sx={{
                color: isActive(page.path) ? "#4f46e5" : "#374151",
                fontWeight: 500,
                textTransform: "none",
                borderBottom: isActive(page.path)
                  ? "2px solid #4f46e5"
                  : "2px solid transparent",
                borderRadius: 0,
                "&:hover": {
                  color: "#4f46e5",
                },
              }}
            >
              {page.name}
            </Button>
          ))}
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ flexGrow: 1 }} />

        {/* MOBILE MENU */}
        <Box
          sx={{ display: { xs: "flex", md: "none" } }}
          onMouseLeave={closeNav}
          onMouseEnter={openNav}
        >
          <IconButton onClick={(e) => setAnchorElNav(e.currentTarget)}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={() => setAnchorElNav(null)}
            PaperProps={{
              onMouseEnter: () => clearTimeout(navTimeout.current),
              onMouseLeave: closeNav,
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={() => {
                  navigate(page.path);
                  setAnchorElNav(null);
                }}
              >
                {page.name}
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* USER */}
        <Box onMouseEnter={openUser} onMouseLeave={closeUser}>
          <IconButton onMouseEnter={(e) => setAnchorElUser(e.currentTarget)}>
            <Avatar
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#4f46e5",
                fontSize: 14,
              }}
            >
              U
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={() => setAnchorElUser(null)}
            MenuListProps={{ onMouseLeave: () => setAnchorElUser(null) }}
            PaperProps={{
              onMouseEnter: () => clearTimeout(userTimeout.current),
              onMouseLeave: closeUser,
              sx: {
                mt: 1,
                borderRadius: 2,
                minWidth: 150,
              },
            }}
          >
            {settings.map((item, i) => (
              <Box key={item.name}>
                <MenuItem onClick={() => handleSettings(item)}>
                  {item.name}
                </MenuItem>
                {i === settings.length - 2 && <Divider />}
              </Box>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
