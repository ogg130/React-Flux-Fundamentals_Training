"use strict"; // Tell the browser to evaluate everything in strict mode

var React = require("react"); // Import react using the common js pattern

// Define component
var Home = React.createClass({
    render: function () {
        return (
            <div className="jumbotron">
                <h1>Pluralsight Administration</h1>
                <p>React, React Router and Flux for ultra-responsive web apps.</p>
            </div>
        );
    }
});

module.exports = Home; // Export for use elsewhere


