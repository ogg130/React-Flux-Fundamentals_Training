"use strict";

var React = require("react");
var AuthorApi = require("../../api/authorApi");
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({
    // Define the inital state of the component - empty array
    getInitialState: function () {
        return {
            authors: []
        };
    },

    // Update the state when the component mounts
    componentDidMount: function () {
        if (this.isMounted()) {
            this.setState({ authors: AuthorApi.getAllAuthors() });
        }
    },

    render: function () {
        return (
            <div>
                <h1>Authors</h1>
                <AuthorList />
            </div>
        );
    }
});

module.exports = AuthorPage;