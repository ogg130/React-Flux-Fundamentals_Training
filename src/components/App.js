import React from "react";
import HomePage from "./HomePage"; // Render our homepage
import AboutPage from "./AboutPage"; // Render our aboutpage
import Header from "./common/Header"; // Render our header
import CoursesPage from "./CoursesPage"; // Render our header

// Function component
function App() {
  // Can extract logic into a function by nesting function below the top
  // level function
  function getPage() {
    // read url to determine which page to render
    const route = window.location.pathname;

    // Basic dumb routing without using react-router
    // if the route is /about, show the about page, otherwise show the homepage
    if (route === "/courses") return <CoursesPage />;
    if (route === "/about") return <AboutPage />;
    return <HomePage />;
  }

  // Display header above each page
  return (
    <div className="container-fluid">
      <Header />
      {getPage()}
    </div>
  );
}

export default App;
