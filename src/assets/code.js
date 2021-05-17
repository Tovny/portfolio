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


const cheerio = require("cheerio");
const fetch = require("node-fetch");

const createFixtureObject = require("../../create-fixture-object");

const scrapeSerieAMatchInfo = async (url) => {
  try {
    const res = await fetch(url);
    const html = await res.text();

    if (res.status == 200 && html) {
      const $ = cheerio.load(html);

      const fixture = createFixtureObject();

      const info = fixture.info;

      (() => {
        let [date, kickOff] = $(".report-data span:nth-child(1)")
          .text()
          .split(" - ");

        let [day, month, year] = date.split("/");
        month = parseInt(month) - 1;
        let [hour, minute] = kickOff.split(":");

        date = new Date(year, month, day, hour, minute);

        if (date.toString() == "Invalid Date") {
          info.date = "TBC";
          info.kickOff = "TBC";
        } else {
          [date, kickOff] = date.toISOString().split("T");
          info.date = date;
          info.kickOff = kickOff.slice(0, 5);
        }
      })();

      fixture.league.name = "Italian Serie A";
      fixture.league.logo = $("#squadre_header .img-responsive").attr("src");

      info.url = url;

      (() => {
        let data = $(".report-data");

        let status = $(data).find(".dcr").text();

        if (status == "MATCH FORFEITED") {
          info.status = "Match Forfeited";
        } else if (status == "Finished") {
          info.status = "Full Time";
        } else {
          info.status = "Scheduled";
        }

        let text = data.text().split("\n");
        text.forEach((para) => {
          if (para.includes("Stadium")) {
            let stadium = para
              .split(/stadium:/i)[1]
              .trim()
              .toLowerCase();
            info.stadium = stadium;
          }
          if (para.includes("Referee")) {
            let referee = para
              .split(/referee:/i)[1]
              .trim()
              .toLowerCase();
            info.referee = referee;
          }
        });
      })();

      info.matchday = parseInt(
        $(".vocefiltro.mostrascelte h2").text().split("|")[2]
      );

      const teams = fixture.teams;

      teams.home.name = $(".report-squadra.squadra-a").text().toLowerCase();
      teams.home.crest =
        "https://www.legaseriea.it" +
        $(".squadra-logo.squadra-a img").attr("src");

      teams.away.name = $(".report-squadra.squadra-b").text().toLowerCase();
      teams.away.crest =
        "https://www.legaseriea.it" +
        $(".squadra-logo.squadra-b img").attr("src");

      const parseScorers = (squad) => {
        let data = $(".report-marcatori.{squad}");

        let goalTime = [];

        $(data)
          .find("span")
          .each((i, min) => {
            goalTime.push($(min).text().replace(/s+/g, ""));
          });

        goalTime = goalTime.filter((min) => min.length > 0);

        $(data).find("span").remove();
        scorers = $(data)
          .text()
          .replace(//g, "|")
          .replace(/+/g, " ")
          .split("|");

        scorers = scorers.map((elt) => elt.trim());
        scorers = scorers.filter((elt) => elt.length > 0);

        let goals = new Array();

        goalTime.map((min, i) => {
          goals.push(min.concat(" ", scorers[i]));
        });

        return goals;
      };

      const result = fixture.result;

      result.home.score = parseInt($(".squadra-risultato.squadra-a").text());
      result.away.score = parseInt($(".squadra-risultato.squadra-b").text());

      result.home.scorers = parseScorers("squadra-a");

      result.away.scorers = parseScorers("squadra-b");

      // Parse the squads
      (() => {
        const squads = fixture.squads;

        $(".report-formazioni .colonna-squadra").each((i, squad) => {
          const squadData = $(squad).find("tbody tr");

          $(squadData).each((j, row) => {
            let number = parseInt($(row).find("td:nth-child(1)").text());
            let player = $(row).find("td:nth-child(2)").text();
            if (i == 0) {
              squads.home.starters.push([number, player]);
            } else if (i == 1) {
              squads.away.starters.push([number, player]);
            }
          });
        });

        $(".report-panchina .colonna-squadra").each((i, squad) => {
          const squadData = $(squad).find("tbody tr");

          $(squadData).each((j, row) => {
            let number = parseInt($(row).find("td:nth-child(1)").text());
            let player = $(row).find("td:nth-child(2)").text();
            if (i == 0) {
              squads.home.reserves.push([number, player]);
            } else if (i == 1) {
              squads.away.reserves.push([number, player]);
            }
          });
        });
      })();

      // Parse the match statistics

      $("#statistiche-comparate .riga").each((i, stat) => {
        const statistic = $(stat).find(".valoretitolo").text();

        fixture.stats[statistic] = new Object();
        const selector = fixture.stats[statistic];

        selector.home = parseInt($(stat).find(".valoresx").text());
        selector.away = parseInt($(stat).find(".valoredx").text());
      });

      const parseEvents = (elt, location) => {
        $(elt).each((i, event) => {
          let data = $(event).attr("data-original-title");
          fixture.timeline[location].push(new Object());
          const eventSelector = fixture.timeline[location][i];
          let [minute, innerEvent] = data.split(" - ");
          if (minute == "INT") minute = "45'";
          innerEvent.trim();

          eventSelector.minute = minute.trim();

          if (innerEvent.includes("Substitution:")) {
            let playerOff = innerEvent.split(" off ")[1].trim();
            let playerIn = innerEvent.split(" in ")[1].split(" and ")[0].trim();

            eventSelector.event = "Substitution";
            eventSelector.playerIn = playerIn;
            eventSelector.playerOff = playerOff;
          }

          if (innerEvent.includes("Yellow card")) {
            let player = innerEvent.split(" for ")[1].trim();

            eventSelector.event = "Yellow card";
            eventSelector.player = player;
          }

          if (innerEvent.includes(" scores a penalty")) {
            let player = innerEvent.split(" scores a penalty")[0].trim();

            eventSelector.event = "Penalty scored";
            eventSelector.player = player;
          }

          if (innerEvent.includes("Own goal by ")) {
            let player = innerEvent.split("Own goal by ")[1].trim();

            eventSelector.event = "Own goal";
            eventSelector.player = player;
          }

          if (innerEvent.includes("Goal by ")) {
            let player = innerEvent.split("Goal by ")[1].trim();

            eventSelector.event = "Goal";
            eventSelector.player = player;
          }

          if (innerEvent.includes("Red card for ")) {
            let player = innerEvent.split("Red card for ")[1].trim();

            eventSelector.event = "Red card";
            eventSelector.player = player;
          }

          if (innerEvent.includes("Two Bookings")) {
            let player = innerEvent.split("Sent-Off ")[1].trim();

            eventSelector.event = "Second yellow card";
            eventSelector.player = player;
          }
        });
      };

      parseEvents(".momenti-squadra1 a", "home");
      parseEvents(".momenti-squadra2 a", "away");

      if (info.status == "Full Time" || info.status == "Match Forfeited") {
        let winner;

        if (result.home.score > result.away.score) {
          winner = "home";
        } else if (result.home.score < result.away.score) {
          winner = "away";
        } else {
          winner = "draw";
        }
        fixture.result.winner = winner;
      }

      return fixture;
    }
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = scrapeSerieAMatchInfo;


`;

export default lorem;
