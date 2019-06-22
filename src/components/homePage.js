import React from "react"; // ES import syntax

// Declare a component as a function
// Function names must be camelcase
function HomePage() {
  return (
    <div className="jumbotron">
      <h1>Pluralsight Administration</h1>
      <p>React, Flux and React Router for ultra-responsive web apps.</p>
      <a href="/about">About</a>
    </div>
  );
}

export default HomePage;
