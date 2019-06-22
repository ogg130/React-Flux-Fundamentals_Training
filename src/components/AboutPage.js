import React from "react";

// Component created as a class instead of function
class AboutPage extends React.Component {
  render() {
    // Can only be one top level element in JSX so you must use a div...
    // return (
    //   <div>
    //     <h2>About</h2>
    //     <p>This app uses React.</p>
    //   </div>
    // );

    // ... instead, use a fragment to deal with adjacent JSX elements - <> </> (better):
    return (
      <>
        <h2>About</h2>
        <p>This app uses React.</p>
      </>
    );
  }
}

export default AboutPage;
