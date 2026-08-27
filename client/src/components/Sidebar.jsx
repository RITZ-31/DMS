import { Link, useLocation, useNavigate } from "react-router-dom";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import {
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Avatar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LogoutIcon from "@mui/icons-material/Logout";
import DescriptionIcon from "@mui/icons-material/Description";

const drawerWidth = 250;

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#1e293b",
          color: "white",
        },
      }}
    >
      <Toolbar>
<Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1,
  }}
>
          <DescriptionIcon />

          <Typography
            variant="h6"
            fontWeight="bold"
          >
            DMS
          </Typography>
        </Box>

      </Toolbar>

      <Divider sx={{ bgcolor: "#475569" }} />

      <Box
        sx={{
          textAlign: "center",
          p: 3,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#2563eb",
            width: 60,
            height: 60,
            margin: "auto",
            mb: 1,
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </Avatar>

        <Typography>
          {user?.name || "User"}
        </Typography>

        <Typography
          variant="body2"
          color="#cbd5e1"
        >
          {user?.email}
        </Typography>
      </Box>

      <Divider sx={{ bgcolor: "#475569" }} />

      <List>

        <ListItemButton
          component={Link}
          to="/dashboard"
          selected={location.pathname === "/dashboard"}
        >
            
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>

          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/documents"
          selected={location.pathname === "/documents"}
        >
          <ListItemIcon>
            <FolderIcon sx={{ color: "white" }} />
          </ListItemIcon>

          <ListItemText primary="Documents" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/upload"
          selected={location.pathname === "/upload"}
        >
          <ListItemIcon>
            <UploadFileIcon sx={{ color: "white" }} />
          </ListItemIcon>

          <ListItemText primary="Upload" />
        </ListItemButton>
      <ListItemButton
 component={Link}
 to="/folders"
 selected={location.pathname==="/folders"}
>
<ListItemIcon>

</ListItemIcon>



</ListItemButton>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ bgcolor: "#475569" }} />

      <List>

        <ListItemButton
          onClick={logout}
        >
          <ListItemIcon>
            <LogoutIcon sx={{ color: "#ef4444" }} />
          </ListItemIcon>

          <ListItemText primary="Logout" />
        </ListItemButton>

      </List>

    </Drawer>
  );
}

export default Sidebar;