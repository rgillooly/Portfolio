import React, { useState, useEffect, Route } from "react";
import "./home.css";

const Home = () => {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = window._env_.REACT_APP_API_URL;

  useEffect(() => {
    console.log("API_URL used:", window._env_.REACT_APP_API_URL);

    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_URL}/api/submission/projects`);

        console.log("Response headers:", response.headers.get("content-type"));

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON response from server");
        }

        const jsonData = await response.json();
        console.log("Fetched projects:", jsonData);
        setProject(jsonData.projects);
      } catch (e) {
        console.error("Error fetching projects:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  return (
    <div className="line-container">
      <div className="blue-line"></div>
      <div className="main">
        <h1>Welcome!</h1>

        <p>
          Welcome to My Personal Site! My name is Ryan Gillooly, and I am a
          full-stack web developer.
        </p>

        <h2>Credentials:</h2>
        <h3>Certificate From Rutgers University Coding Bootcamp</h3>
        <h3>Bachelor of Arts from Fairleigh Dickinson University</h3>

        <h4>Check Out Some Recent Projects Below:</h4>

        <h4>----------</h4>

        {/* Show loading state */}
        {loading && <p>Loading projects...</p>}

        {/* Show error message if request fails */}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {/* Render projects if available */}
        {!loading && !error && project.length > 0 ? (
          <ul>
            {project.map((proj) => {
              console.log(proj); // Check if proj is logged correctly
              return (
                <li key={proj._id}>
                  <h1>{proj.projectName}</h1>
                  <h2>{proj.projectDescription}</h2>
                  <button
                    onClick={() => {
                      const url = proj.projectLink.startsWith("http")
                        ? proj.projectLink
                        : `https://${proj.projectLink}`;
                      window.open(url, "_blank"); // Open in new tab
                    }}
                    style={{
                      padding: "10px",
                      backgroundColor: "#008CBA",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Visit The Site
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          !loading && !error && <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
