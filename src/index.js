import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { render } from "react-dom"; // Named import - creats a const that references react-dom's render function
import App from "./components/App"; // Render app component
import { BrowserRouter as Router } from "react-router-dom";

// Arg 1 - the component we want to render - HomePage
// Arg 2 - specify DOM element where we wish to place our application
//  (look at public/index.html line 26 to find an element to bind our
//   application to - 'root')
render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
