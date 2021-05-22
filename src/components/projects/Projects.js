import Project from "./Project";

import "./Projects.scss";

import chatApp from "../../assets/chat-app.png";
import footballTracker from "../../assets/football-tracker.png";

const Projects = () => {
  return (
    <section className="projects">
      <Project
        preview={chatApp}
        imgPos="right"
        tech="ws, Firebase, RxJS, React"
        title="Chat Website"
        description={[
          <p key="1">A fullstack realtime chat website. </p>,
          <p key="2">
            User authentication and chat history are handled by Firebase.
          </p>,
          <p key="3">
            A two-way interactive connection by the back and frontend is
            established using the websockets protocol. On the NodeJS backend the
            connection is handled by the ws library, and on the React frontend
            by the RxJS library.
          </p>,
        ]}
        href="https://chat-app-tovny.herokuapp.com/"
        github="https://github.com/Tovny/chat-site"
      />
      <Project
        preview={footballTracker}
        imgPos="left"
        tech="MERN stack"
        title="Football Tracker"
        description={[
          <p key="4">
            A fullstack website that tracks football results and news.{" "}
          </p>,
          <p key="5">
            The actual results are scraped once a day from the official league
            sites with scrapers made with Cheerio and Puppeteer.
          </p>,
          <p key="6">
            That data is parsed and saved in a MongoDB database, which is
            connected to the React frontend with a RESTful API created with
            Express.
          </p>,
        ]}
        href="https://serene-everglades-51285.herokuapp.com/"
        github="https://github.com/Tovny/fullstack-football-tracker"
      />
    </section>
  );
};

export default Projects;
