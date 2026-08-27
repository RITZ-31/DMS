import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";


function FolderCard({ folder, handleDelete }) {

  const navigate = useNavigate();


  return (
    <Card
      sx={{
        width:300,
        borderRadius:4,
        boxShadow:3,
        cursor:"pointer",
        transition:"0.3s",

        "&:hover":{
          transform:"translateY(-5px)",
          boxShadow:8,
        }
      }}
      onClick={() => navigate(`/folders/${folder._id}`)}
    >

      <CardContent>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >

          <FolderIcon
            sx={{
              fontSize:60,
              color:"#facc15"
            }}
          />


          <IconButton
            color="error"
            onClick={(e)=>{
              e.stopPropagation();
              handleDelete(folder._id);
            }}
          >
            <DeleteIcon/>
          </IconButton>


        </Box>


        <Typography
          variant="h6"
          fontWeight="bold"
          mt={2}
        >
          {folder.name}
        </Typography>


      </CardContent>

    </Card>
  );
}


export default FolderCard;