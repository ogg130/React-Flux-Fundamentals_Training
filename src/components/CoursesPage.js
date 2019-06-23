/* This is the controller view or smart component - it focuses solely 
on state concerns - makes an api call, populates state, passes state 
to course list - sepration between smart and dumb components or logic 
and markup */

// Import useState and useEffect hooks along with react
import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";

function CoursePage() {
  /* Declare state  using the useState hook- the courses state 
  uses the setCourses setter to declare the default value of 
  useState([]) - [] = empty array of courses*/
  const [courses, setCourses] = useState([]);

  /* Replicate a componentDidMount lifecycle method*/
  useEffect(() => {
    /* Get courses from the API. When the call completes, store the array
    of courses in state */
    /* getCourses uses fetch's promise based api to handle async calls to
    get a list of courses */
    /* To handle a resolved promise, call .then - function will be called
    when the api call is completed */
    getCourses().then(_courses => setCourses(_courses));
  }, []);
  /* notice the closing empty array of courses above - this is called the 
  dependency array - it tells useEffect when to re-rerun - without it, the
  function runs on every rerender - with it, it only runs once*/

  return (
    <>
      <h2>Courses</h2>
      {/* Client side button */}
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      {/* Pass the state object - an array of courses - into the child
      component */}
      <CourseList courses={courses} />
    </>
  );
}

export default CoursePage;
