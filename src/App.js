import { useRef } from "react";

import "./App.scss";

import LandingPage from "./components/landingPage/LandingPage";
import Projects from "./components/projects/Projects";
import About from "./components/About";
import Navigation from "./components/Navigation";

function App() {
  const landingSection = useRef();
  const projectSection = useRef();
  const aboutSection = useRef();
  return (
    <div className="App">
      <LandingPage ref={landingSection} />
      <Projects ref={projectSection} />
      <About ref={aboutSection} />
      <Navigation
        landingSection={landingSection}
        projectSection={projectSection}
        aboutSection={aboutSection}
      />
    </div>
  );
}

export default App;
