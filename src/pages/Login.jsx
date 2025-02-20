import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { login } from "../store/slices/authSlice.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      login({
        id: Date.now().toString(),
        username: loginData.username,
        bookings: [],
      })
    );
    navigate(from, { replace: true });
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "0 auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Login to Continue
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            required
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Login
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Login;
