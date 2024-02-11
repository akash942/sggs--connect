import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
  Switch,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { ananomousAtom } from "../atoms.js";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Footer from "./Footer";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { BASE_URL } from "../config.js";
import { handleAnanamousCall } from "../api/users";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const [userAnanamous, setUserAnanamous] = useRecoilState(ananomousAtom);
  const iconColor = theme.palette.primary.main;

  async function handleAnanamousToggle(e) {
    setUserAnanamous(e.target.checked);
    handleAnanamousCall(user, e.target.checked);
  }

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <Card>
      {user ? (
        <Stack alignItems="center" spacing={2}>
          <Box my={1}>
            <UserAvatar width={150} height={150} username={user.username} />
          </Box>

          <Typography variant="h5">{!userAnanamous? user.username:"anonymous"}</Typography>

          {props.editing ? (
            <Box>
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />
            </Box>
          ) : user.biography ? (
            <Typography textAlign="center" variant="p">
              <b>Bio: </b>
              {user.biography}
            </Typography>
          ) : (
            <Typography variant="p">
              <i>No bio yet</i>
            </Typography>
          )}

          {currentUser && user._id === currentUser.userId && (
            <Box>
              <Button
                startIcon={<AiFillEdit color={iconColor} />}
                onClick={props.handleEditing}
              >
                {props.editing ? <>Cancel</> : <>Edit bio</>}
              </Button>
            </Box>
          )}
          {currentUser && user._id === currentUser.userId && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              alignContent={"center"}
            >
              <Typography>HIDE</Typography>
              <Switch
                checked={userAnanamous}
                onChange={handleAnanamousToggle}
                inputProps={{ "aria-label": "controlled" }}
              ></Switch>
            </Box>
          )}

          {currentUser && user._id !== currentUser.userId && (
            <Button variant="outlined" onClick={props.handleMessage}>
              Message
            </Button>
          )}

          <HorizontalStack>
            <Typography color="text.secondary">
              Likes <b>{props.profile.posts.likeCount}</b>
            </Typography>
            <Typography color="text.secondary">
              Posts <b>{props.profile.posts.count}</b>
            </Typography>
          </HorizontalStack>
        </Stack>
      ) : (
        <Loading label="Loading profile" />
      )}
    </Card>
  );
};

export default Profile;
