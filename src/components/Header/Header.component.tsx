import { Box } from "@mui/material";

import { Link } from "react-router-dom";

import { HomeIcon } from "../HomeIcon/HomeIcon.component";

export const Header = () => (
  <Box marginBottom="25px">
    <Link to="/">
      <HomeIcon />
    </Link>
  </Box>
);
