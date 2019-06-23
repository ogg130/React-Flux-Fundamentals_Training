import React from "react";
import { getCourses } from "../api/courseApi";

class CoursePage extends React.Component {
  //Declare our state using class field syntax instead of a constructor
  state = {
    courses: []
  };

  // Request a list of courses when the page loads
  // Declare a lifecycle method
  // Proper lifecycle method to make api calls with - component needs to be
  //     mounted before we call setState
  componentDidMount() {
    // getCourses uses fetch's promise based api to handle async calls to
    //    get a list of courses
    // To handle a resolved promise, call .then - function will be called
    //    when the api call is completed

    //Get courses from the API. When the call completes, store the array
    //of courses in state
    getCourses().then(courses => this.setState({ courses: courses }));
    // This anonymous function is using concise arrow syntax
    // Must use setstate... cant use this.state.courses
    //    you cannot mutate state directly
  }

  render() {
    return (
      <>
        <h2>Courses</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author ID</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {/* Map returns a  new array, this code returns an array of rows
                Map is used in Javascript to iterate over arrays 
                Arrow function instead of anon function because:
                    1) Less code
                    2) No "this" binding issues(?)*/}
            {this.state.courses.map(course => {
              return (
                <tr key={course.id}>
                  <td>{course.title}</td>
                  <td>{course.authorId}</td>
                  <td>{course.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default CoursePage;
