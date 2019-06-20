$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');
var Authors = require('./components/authors/authorPage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');

// Simple component that extracts the route name from a hash value in a uri
// without using React router
(function (win) { //Immediately invoked function expression (iffe)
    "use strict";
    var App = React.createClass({
        render: function () {
            var Child; // Keeps track of which child we want to render

            // Look at the route for this app
            switch (this.props.route) {
                case 'about': Child = About; break; // If route is about, child is about
                case 'authors': Child = Authors; break; // If route is authors, child is authors
                default: Child = Home; //Otherwise, default to homepage
            }

            // Return markup - either loads about or home page component
            return (
                <div>
                    <Header />
                    <Child />
                </div>
            );
        }
    });

    function render() {

        // Extract everything to the right of # in uri
        var route = win.location.hash.substr(1);

        //Render the dynamically chosen component in index.html's app element
        React.render(<App route={route} />, document.getElementById('app'));
    }

    // When a hash change occurs, run the render function
    win.addEventListener('hashchange', render);

    render();
})(window);