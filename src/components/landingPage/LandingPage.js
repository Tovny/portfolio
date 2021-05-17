import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import gsap from "gsap";

import CodeText from "./CodeText";
import BinaryText from "./BinaryText";

import "./LandingPage.scss";

const LandingPage = () => {
  useEffect(() => {
    gsap.from(".landingPage h1", { y: 25, opacity: 0, duration: 1 });
    gsap.from(".landingPage h2", { y: -25, opacity: 0, duration: 1 });
    gsap.from(".landingPage hr", { opacity: 0, duration: 2 });
    gsap.from(".landingPage button", {
      y: 25,
      opacity: 0,
      duration: 1,
      delay: 0.25,
    });
  }, []);
  return (
    <div className="landingPage">
      <Canvas>
        <Suspense fallback={null}>
          <CodeText />
          {(() => {
            const code = [];
            for (let i = -20; i <= 20; i += 0.9) {
              code.push(<BinaryText x={i} />);
            }
            return code;
          })()}
        </Suspense>
      </Canvas>
      <div className="landingText">
        <h2>Hi, I'm Anton Drofenik</h2>
        <hr />
        <h1>
          I'm a <span>fullstack developer</span>
        </h1>
        <button>Learn More</button>
      </div>
    </div>
  );
};

export default LandingPage;
