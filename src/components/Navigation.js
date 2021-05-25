import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { HiChevronDoubleUp } from "react-icons/hi";
import { MdWork } from "react-icons/md";
import { SiAboutDotMe } from "react-icons/si";

import "./Navigations.scss";

const Navigation = ({ landingSection, projectSection, aboutSection }) => {
  const navUl = useRef();
  const projectsButton = useRef();
  const aboutButton = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const activeColor = "rgb(130, 0, 216)";

    const landing = landingSection.current;
    const project = projectSection.current;
    const about = aboutSection.current;
    const nav = navUl.current;
    const projButton = projectsButton.current;
    const aboutMeButton = aboutButton.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: project,
        start: () =>
          nav.getBoundingClientRect().top <= 50
            ? landing.getBoundingClientRect().height - 10
            : landing.getBoundingClientRect().height / 2 + 100,
        toggleActions: "play none none reverse",
      },
    });

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: project,
        start: () =>
          nav.getBoundingClientRect().top <= 50
            ? landing.getBoundingClientRect().height - 10
            : landing.getBoundingClientRect().height / 2 + 100,
        end: () =>
          nav.getBoundingClientRect().top <= 50
            ? landing.getBoundingClientRect().height -
              10 +
              project.getBoundingClientRect().height / 1.15
            : landing.getBoundingClientRect().height / 2 +
              project.getBoundingClientRect().height * 1.25,
        toggleActions: "play reverse play reverse",
      },
    });

    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: about,
        start: () =>
          nav.getBoundingClientRect().top <= 50
            ? landing.getBoundingClientRect().height -
              10 +
              project.getBoundingClientRect().height / 1.15
            : landing.getBoundingClientRect().height / 2 +
              project.getBoundingClientRect().height * 1.25,
        toggleActions: "play none none reverse",
      },
    });

    tl.to([nav.children, nav], {
      pointerEvents: "auto",
      right: 0,
      opacity: 1,
      stagger: 0.075,
      ease: `elastic.out(.5, 0.25)`,
    });

    tl2.to(projButton, { color: activeColor, duration: 0.15 });

    tl3.to(aboutMeButton, { color: activeColor, duration: 0.15 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ul id="nav" ref={navUl}>
      <li>
        <button
          onClick={() =>
            landingSection.current.scrollIntoView({ behavior: "smooth" })
          }
        >
          <HiChevronDoubleUp />
        </button>
      </li>
      <li>
        <button
          ref={projectsButton}
          onClick={() =>
            projectSection.current.scrollIntoView({ behavior: "smooth" })
          }
        >
          <MdWork />
        </button>
      </li>
      <li>
        <button
          ref={aboutButton}
          onClick={() =>
            aboutSection.current.scrollIntoView({ behavior: "smooth" })
          }
        >
          <SiAboutDotMe />
        </button>
      </li>
    </ul>
  );
};

export default Navigation;
