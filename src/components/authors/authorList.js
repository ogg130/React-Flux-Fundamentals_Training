"use strict";

var React = require("react");

var AuthorList = React.createClass({
    propTypes: {
        authors: React.PropTypes.array.isRequired
    },
    render: function () {
        var createAuthorRow = function (author) {
            return (
                <tr key={author.id}> //needs to be unique key
                    <td><a href={"/#authors/" + author.id}>{author.id}</a></td>
                    <td>{author.firstName} {author.lastName}</td>
                </tr>
            );
        };

        return (
            <div>
                <table className="table">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                        // the state of this component
                        {this.props.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = AuthorList;