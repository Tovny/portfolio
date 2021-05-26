import { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./About.scss";

import { FaGithub } from "react-icons/fa";

const About = (props, ref) => {
  const sectionHeadingDiv = useRef();
  const infoUl = useRef();
  const aboutImg = useRef();
  const aboutDiv = useRef();

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

    gsap.from(infoUl.current.children, {
      scrollTrigger: {
        trigger: infoUl.current,
        start: "center bottom",
      },
      scaleX: 0,
      opacity: 0,
      duration: 1.25,
      stagger: 0.25,
      ease: `back.out(1.25)`,
    });

    gsap.from(aboutDiv.current.children, {
      scrollTrigger: {
        trigger: aboutImg.current,
        start: "bottom bottom",
      },
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      duration: 1,
      stagger: 0.3,
      ease: `back.out(1.5)`,
    });
  }, []);

  return (
    <section id="about" ref={ref}>
      <div className="sectionHeading" ref={sectionHeadingDiv}>
        <h1 className="flipAnimate">
          <span data-hover="About me">About me</span>
        </h1>
        <hr />
      </div>
      <ul ref={infoUl}>
        <li>
          <h4>Anton Drofenik</h4>
        </li>
        <li>
          <h4>Maribor, Slovenia</h4>
        </li>
        <li>
          <h4>Three years coding experience</h4>
        </li>
        <li>
          <h4>Excellent Javascript knowledge (React, Node.js)</h4>
        </li>
        <li>
          <h4>Limited Typescript knowledge (Angular)</h4>
        </li>
        <li>
          <h4>Limited PHP knowledge</h4>
        </li>
        <li>
          <a
            href="https://github.com/Tovny"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </li>
      </ul>
      <div className="aboutMe" ref={aboutDiv}>
        <div className="photo" ref={aboutImg}></div>
        <p>
          The idea that a person can change the world with a few lines of code
          has always resonated with me. That is why I decided to learn
          programming over three years ago and haven't looked back since.
        </p>
        <p>
          I learned to program using the Scheme dialect of LISP, which gave me a
          strong understanding of the core concepts of programming and the
          ability to quickly learn new languages. Since then I have been
          learning and using Javascript on a daily basis to master web
          development and learn new technologies.
        </p>
        <p>
          I use React for my frontend needs and Node.js for the backend. I also
          have a limited experience with Angular, Typescript and PHP.
        </p>
        <p>
          I strive to make my websites fast, responsive and user friendly, with
          code that is clean and easy to understand. The code for my projects is
          available on my {` `}
          <a
            href="https://github.com/Tovny"
            target="_blank"
            rel="noopener noreferrer"
            className="flipAnimate"
          >
            <span data-hover="Github">Github</span>
          </a>
          {` `}
          profile.{" "}
        </p>
      </div>
    </section>
  );
};

export default forwardRef(About);
