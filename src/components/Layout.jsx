import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { logout } from "../store/slices/authSlice.js";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              flexGrow: 1, 
              textDecoration: 'none', 
              color: 'inherit' 
            }}
          >
            Event Booking System
          </Typography>
          {user ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/my-bookings"
              >
                My Bookings
              </Button>
              <Typography>
                Welcome, {user.username}!
              </Typography>
              <Button 
                color="inherit" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;