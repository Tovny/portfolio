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
  return (
    <div
      className="project"
      style={imgPos === "left" ? { textAlign: "left" } : { textAlign: "right" }}
    >
      {imgPos === "left" ? (
        <div className="sitePreviews">
          <img src={preview} alt="prev"></img>
        </div>
      ) : null}

      <div className="projectDesc">
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
              <a href={href} target="_blank" rel="noopener noreferrer">
                <h3>Live Demo</h3>
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
              <a href={href} target="_blank" rel="noopener noreferrer">
                <h3>Live Demo</h3>
              </a>
            </>
          )}
        </div>
      </div>
      {imgPos === "right" ? (
        <div className="sitePreviews">
          <img src={preview} alt="prev"></img>
        </div>
      ) : null}
    </div>
  );
};

export default Project;
