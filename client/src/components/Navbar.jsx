import { Link, useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LogoutIcon from "@mui/icons-material/Logout";
import DescriptionIcon from "@mui/icons-material/Description";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#1e293b",
        boxShadow: 3,
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexGrow: 1,
          }}
        >
          <DescriptionIcon fontSize="large" />
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            DMS
          </Typography>
        </Box>

        {/* Navigation */}
        <Button
          color="inherit"
          component={Link}
          to="/dashboard"
          startIcon={<DashboardIcon />}
        >
          Dashboard
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/documents"
          startIcon={<FolderIcon />}
        >
          Documents
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/upload"
          startIcon={<UploadFileIcon />}
        >
          Upload
        </Button>

        <Button
          color="error"
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{ ml: 2 }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;