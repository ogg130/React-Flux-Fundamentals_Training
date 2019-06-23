import React from "react";

// Function component - Builds a basic navbar with anchors for pages
function Header() {
  return (
    <nav>
      <a href="/">Home</a> | <a href="/courses">Courses</a> |{" "}
      <a href="/about">About</a>
    </nav>
  );
}

export default Header;
