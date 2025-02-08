import { useEffect } from "react";
import Projects from "./Projects";

const Home = () => {
  return (
    <>
      <div>
        <h1>Welcome!</h1>

        <p>
          Welcome to My Personal Site! May name is Ryan Gillooly and I am a
          full-stack web developer
        </p>

        <h2>Credentials:</h2>

        <h3>Certificate From Rutgers University Coding Bootcamp</h3>

        <h3>Bachelor of Arts from Fairleigh Dickinson University</h3>

        <h4>Check Out Some Recent Projects Below:</h4>

        {projects &&
          projects.length > 0 &&
          projects.map((project) => (
            <Projects key={project._id} _id={project._id} project={project} />
          ))}
      </div>
    </>
  );
};

export default Home;
