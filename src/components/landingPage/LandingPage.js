import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, forwardRef } from "react";
import { gsap } from "gsap";

import CodeText from "./CodeText";
import BinaryText from "./BinaryText";

import { ImArrowRight2 } from "react-icons/im";

import "./LandingPage.scss";

const LandingPage = (props, ref) => {
  const [arrowClass, setArrowClass] = useState("");

  const landingH1 = useRef();
  const landingH2 = useRef();
  const landingHr = useRef();
  const landingButton = useRef();

  useEffect(() => {
    gsap.to(document.documentElement, { "--Y": 0, duration: 1 });
    gsap.from(landingH1.current, { y: -25, opacity: 0, duration: 1 });
    gsap.from(landingH2.current, { y: 25, opacity: 0, duration: 1 });
    gsap.from(landingHr.current, { opacity: 0, duration: 2, delay: 0.25 });
    gsap.from(landingButton.current, {
      opacity: 0,
      duration: 2,
      delay: 0.5,
    });
  }, []);

  return (
    <section id="landing" ref={ref}>
      <Canvas>
        <Suspense fallback={null}>
          <CodeText />
          {(() => {
            const code = [];
            for (let i = -15; i <= 15; i += 1) {
              code.push(<BinaryText key={i} x={i} />);
            }
            return code;
          })()}
        </Suspense>
      </Canvas>
      <div className="landingText">
        <h2 ref={landingH2}>Hi, I'm Anton Drofenik</h2>
        <hr ref={landingHr} />
        <h1 ref={landingH1}>
          I'm a <span>fullstack developer</span>
        </h1>
        <button
          ref={landingButton}
          onMouseOver={() => setArrowClass("arrowDown")}
          onMouseLeave={() => setArrowClass("")}
          onClick={() =>
            window.scroll({
              top: ref.current.getBoundingClientRect().height,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          View my work
          <span>
            <ImArrowRight2 className={arrowClass} />
          </span>
        </button>
      </div>
    </section>
  );
};

export default forwardRef(LandingPage);
