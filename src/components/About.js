import { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./About.scss";

const About = (props, ref) => {
  const aboutH2 = useRef();
  const aboutImg = useRef();
  const aboutDiv = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(aboutH2.current, {
      scrollTrigger: {
        trigger: aboutH2.current,
        start: "bottom bottom",
      },
      opacity: 0,
      y: -25,
      duration: 1,
      stagger: 0.3,
    });

    gsap.from(aboutDiv.current.children, {
      scrollTrigger: {
        trigger: aboutImg.current,
        start: "bottom bottom",
      },
      opacity: 0,
      y: -25,
      duration: 1,
      stagger: 0.3,
    });
  }, []);

  return (
    <section className="about" ref={ref}>
      <h2 ref={aboutH2}>Who am I?</h2>
      <div className="aboutMe" ref={aboutDiv}>
        <h4>Anton Drofenik, 28 years old, living in Maribor, Slovenia</h4>
        <div className="photo" ref={aboutImg}></div>
        <p>
          The idea that a person can change the world with a few lines of code
          has always appealed to me. That is why I decided to learn programming
          over three years ago now and haven't looked back since.
        </p>
        <p>
          I learned to program using the Scheme dialect of LISP, which gave me a
          strong understanding of the core concepts of programming and the
          ability to quickly learn new languages. Since then I have been
          learning and using Javascript on a daily basis to master web
          development and learn new technologies.
        </p>
        <p>
          I use React for my frontend needs and Node.js for the backend. You can
          view the code for my projects on my {` `}
          <a
            href="https://github.com/Tovny"
            target="_blank"
            rel="noopener noreferrer"
          >
            {`Github`}
          </a>
          {` `}
          profile. I also have a limited experience with Angular and PHP. I
          strive to make my websites fast, responsive and user friendly, with
          code that is clean and easy to understand.
        </p>
      </div>
    </section>
  );
};

export default forwardRef(About);
