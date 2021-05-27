import { useRef, useEffect } from "react";
import smoothscroll from "smoothscroll-polyfill";

import "./App.scss";

import LandingPage from "./components/landingPage/LandingPage";
import Projects from "./components/projects/Projects";
import About from "./components/About";
import Navigation from "./components/Navigation";

function App() {
  const landingSection = useRef();
  const projectSection = useRef();
  const aboutSection = useRef();

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const setVh = debounce(() => {
    const oldVh = document.documentElement.style.getPropertyValue("--vh");
    const newVh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${newVh}px`);

    const scrollAmount = parseFloat(oldVh) * 100 - parseFloat(newVh) * 100;

    if (window.scrollY !== 0) window.scrollBy(0, scrollAmount);
  });

  setVh();

  useEffect(() => {
    smoothscroll.polyfill();

    window.addEventListener("resize", setVh);

    return () => window.removeEventListener("resize", setVh);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
