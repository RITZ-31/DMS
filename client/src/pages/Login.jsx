import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
     toast.error(
    error.response?.data?.message || "Login failed"
     );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#2563eb,#7c3aed)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: 420,
          borderRadius: 5,
          p: 5,
        }}
      >
        <Stack spacing={3}>
          <Box textAlign="center">
            <DescriptionIcon
              sx={{
                fontSize: 70,
                color: "#2563eb",
              }}
            />

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Welcome Back
            </Typography>

            <Typography color="text.secondary">
              Sign in to your Document Management System
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
            }}
          >
            Sign In
          </Button>

          <Typography textAlign="center">
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Login;
