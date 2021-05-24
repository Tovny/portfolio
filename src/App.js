import "./App.scss";

import LandingPage from "./components/landingPage/LandingPage";
import Projects from "./components/projects/Projects";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="App">
      <LandingPage />
      <Projects />
      <About />
      <Contact />
    </div>
  );
}

export default App;
