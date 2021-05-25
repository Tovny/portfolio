import { forwardRef, useEffect, useRef } from "react";
import Project from "./Project";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Projects.scss";

import chatApp from "../../assets/chat-app.png";
import footballTracker from "../../assets/football-tracker.png";

const Projects = (props, ref) => {
  const sectionHeadingDiv = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(sectionHeadingDiv.current.children, {
      scrollTrigger: {
        trigger: sectionHeadingDiv.current,
        start: "center bottom",
      },
      scaleX: 0,
      duration: 2,
      stagger: 0.35,
      ease: `elastic.out(1, .45)`,
    });
  }, []);

  return (
    <section className="projects" ref={ref}>
      <div className="sectionHeading" ref={sectionHeadingDiv}>
        <h1 className="flipAnimate">
          <span data-hover="Projects">Projects</span>
        </h1>
        <hr />
      </div>
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
            established using the websockets protocol. On the Node.js backend
            the connection is handled by the ws library, and on the React
            frontend by the RxJS library.
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
      <footer>
        <hr />
        <span> Important note</span>: Projects are hosted on the Heroku free
        tier, where servers are put to sleep after half an hour of inactivity.
        For that reason the initial webpage load may require more time, and is
        not indicative of actual loading performance.
      </footer>
    </section>
  );
};

export default forwardRef(Projects);
