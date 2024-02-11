import { Button, Card, Link, Stack, Typography } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { MdSettingsInputAntenna } from "react-icons/md";
import { useLocation, useSearchParams } from "react-router-dom";
import { getPosts, getUserLikedPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
// import CreatePost from "./CreatePost";
import { getUnverifiedUsers } from "../api/users";
import Loading from "./Loading";
import PostCard from "./PostCard";
// import SortBySelect from "./SortBySelect";
import HorizontalStack from "./util/HorizontalStack";
import VerificationModal from "./VerificationModal";

const VerifyBrowser = () => {
  const [users, setUsers] = useState([]);

  async function getdata() {
    const usersData = await getUnverifiedUsers();
    // users.push(usersData)
    setUsers((prev) => {
      return [...prev, ...usersData];
    });
  }

  useEffect(() => {
    setUsers([]);
    getdata();
    console.log(users);
  }, []);

  useEffect(() => {
    console.log("array:", users);
  }, [users]);

  return (
    <>
      <div className="flex flex-col gap-3 mt-8 ml-8">
        {users.map((user) => (
          <VerificationModal key={user.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default VerifyBrowser;
