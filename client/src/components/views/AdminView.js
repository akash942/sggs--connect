import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import VerifyBrowser from "../VerifyBrowser"
import Navbar from "../Navbar";
import PostEditor from "../PostEditor";
import Sidebar from "../Sidebar";
import { useState } from "react";

const AdminView = () => {
  const [users, setUsers] = useState([]);

  return (
    <Container>
      <Navbar />
      <GridLayout left={<VerifyBrowser/>} right={<Sidebar />} />
    </Container>
  );
};

export default AdminView;
