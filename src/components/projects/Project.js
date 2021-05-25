import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FaGithub } from "react-icons/fa";

const Project = ({
  preview,
  imgPos,
  tech,
  title,
  description,
  href,
  github,
}) => {
  const projectDiv = useRef();
  const projectDescDiv = useRef();
  const projectPreviewImg = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(projectPreviewImg.current, {
      scrollTrigger: {
        trigger: projectPreviewImg.current,
        start: "center bottom",
      },
      opacity: 0,
      x: imgPos === "left" ? -100 : 100,
      duration: 1.5,
      ease: `back.out(2)`,
    });

    gsap.from(projectDescDiv.current.children, {
      scrollTrigger: {
        trigger: projectDescDiv.current,
        start: "center bottom",
      },
      opacity: 0,
      x: imgPos === "left" ? 100 : -100,
      duration: 1,
      stagger: 0.25,
      ease: `back.out(2)`,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={imgPos === "left" ? "project" : "project right"}
      style={imgPos === "left" ? { textAlign: "left" } : { textAlign: "right" }}
      ref={projectDiv}
    >
      <div className="sitePreviews">
        <img
          src={preview}
          alt={`${title} preview`}
          ref={projectPreviewImg}
        ></img>
      </div>
      <div className="projectDesc" ref={projectDescDiv}>
        <h4>{tech}</h4>
        <h2>{title}</h2>
        {description}
        <div
          className="projectLinks"
          style={
            imgPos === "left"
              ? { justifyContent: "flex-start" }
              : { justifyContent: "flex-end" }
          }
        >
          {imgPos === "left" ? (
            <>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flipAnimate"
              >
                <h4 data-hover="Live Demo">Live Demo</h4>
              </a>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
            </>
          ) : (
            <>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flipAnimate"
              >
                <h4 data-hover="Live Demo">Live Demo</h4>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
