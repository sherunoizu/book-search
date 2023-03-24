// interface RootLayoutProps {
//   children: React.ReactElement;
// }
import { Header } from "../../components";

import { Container } from "@mui/material";

import { Outlet } from "react-router-dom";

export const RootLayout: React.FC = ({}) => {
  return (
    <Container
      sx={{
        maxWidth: "100vw",
        borderRadius: "10px",
        m: "10px auto",
        p: "25px",
        bgcolor: "#4d706c",
        minHeight: "95vh",
      }}
    >
      <Header />
      <Outlet />
    </Container>
  );
};
