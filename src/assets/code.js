const lorem = `import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/actions/user-actions";
import {
  setMessages,
  resetMessages,
} from "../../redux/actions/message-actions";
import {
  setActiveUsers,
  removeActiveUser,
  resetActiveUsers,
} from "../../redux/actions/active-users-actions";
import setOpenActiveUsersDrawer from "../../redux/actions/active-users-drawer-actions";

import {
  userSubject$,
  messages$,
  activeUsers$,
  userLeave$,
  useObservable,
  getMessages,
  sendMessage,
} from "../../websocket";

import Messages from "./Messages";
import ActiveUsers from "./Active-users";

import { Drawer, Grid, Hidden } from "@material-ui/core";
import useMessageStyles from "./Chat-window-styles";

const ChatWindow = () => {
  const dispatch = useDispatch();

  const classes = useMessageStyles();

  const messages = useSelector((state) => state.messages);
  const activeUsers = useSelector((state) => state.activeUsers);
  const user = useSelector((state) => state.user);
  const room = useSelector((state) => state.room);
  const drawerOpen = useSelector((state) => state.activeUsersDrawer);

  useObservable(messages$, setMessages);
  useObservable(activeUsers$, setActiveUsers);
  useObservable(userLeave$, removeActiveUser);

  useEffect(() => {
    if (!user) {
      const randomUsername = User.{Math.ceil(Math.random() * 10000)};
      const randomUser = {
        username: randomUsername,
        uid: randomUsername,
        avatar: null,
      };
      dispatch(setUser(randomUser));

      getMessages(randomUser, room);
    } else {
      getMessages(user, room);
    }

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", {vh}px);

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", {vh}px);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(resetMessages());
      dispatch(resetActiveUsers());
      getMessages(user, room);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  useEffect(() => {
    userSubject$.next(user);
  }, [user]);

  return (
    <Grid container className={classes.chatWindow}>
      <Grid item xs={12} sm={8} className={classes.messageWindow}>
        <Messages
          messages={messages}
          sendMessage={sendMessage}
          user={user}
          room={room}
          classes={classes}
        />
      </Grid>
      <Hidden xsDown>
        <Grid item sm={4}>
          <ActiveUsers activeUsers={activeUsers} classes={classes} />
        </Grid>
      </Hidden>
      <Drawer
        open={drawerOpen}
        onClose={() => dispatch(setOpenActiveUsersDrawer(false))}
        anchor="right"
      >
        <ActiveUsers
          activeUsers={activeUsers}
          classes={classes}
          drawer={true}
        />
      </Drawer>
    </Grid>
  );
};

export default ChatWindow;


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const articleRoutes = require("./routes/articles");
const matchRoutes = require("./routes/matches");
const tableRoutes = require("./routes/tables");
const leagueRoutes = require("./routes/leagues");

const { mongoURI, PORT } = require("./config");

(async () => {
  try {
    const app = express();

    app.use(cors());

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database connected");

    app.use("/api/articles", articleRoutes);
    app.use("/api/matches", matchRoutes);
    app.use("/api/tables", tableRoutes);
    app.use("/api/leagues", leagueRoutes);

    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));

      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }

    app.listen(PORT || 5000, "0.0.0.0", () =>
      console.log("App live on port {PORT}")
    );
  } catch (err) {
    console.log(err);
  }
})();


`;

export default lorem;
