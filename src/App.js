import "./App.scss";
import { useEffect } from "react";
import gsap from "gsap/gsap-core";

import LandingPage from "./components/landingPage/LandingPage";

function App() {
  useEffect(() => {
    gsap.to(".texto", {
      // selector text, Array, or object
      x: 100, // any properties (not limited to CSS)
      backgroundColor: "red", // camelCase
      duration: 1, // seconds
      delay: 0.5,
      ease: "power2.inOut",
      stagger: 0.1, // stagger start times
      paused: true, // default is false
      overwrite: "auto", // default is false
      repeat: 2, // number of repeats (-1 for infinite)
      repeatDelay: 1, // seconds between repeats
      repeatRefresh: true, // invalidates on each repeat
      yoyo: true, // if true > A-B-B-A, if false > A-B-A-B
      yoyoEase: true, // or ease like "power2"
      immediateRender: false,

      // other callbacks:
      // onStart, onUpdate, onRepeat, onReverseComplete
      // Each callback has a params property as well
      // i.e. onUpdateParams (Array)
    });
  }, []);
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
