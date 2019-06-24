/* This is the controller view or smart component - it focuses solely 
on state concerns - makes an api call, populates state, passes state 
to course list - sepration between smart and dumb components or logic 
and markup */

// Import useState and useEffect hooks along with react
import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursePage() {
  /* Declare state  using the useState hook- the courses state 
  uese the setCourses setter to declare the default value of 
  useState to a list of all courses */
  const [courses, setCourses] = useState(courseStore.getCourses());

  /* Replicate a componentDidMount lifecycle method with the useEffect hook*/
  useEffect(() => {
    /* subscribe to the flux store */
    courseStore.addChangeListener(onChange);

    /*if courses havent been loaded, call loadcourses action when page mounts */
    if (courseStore.getCourses().length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onChange); //cleanup on unmount
  }, []);
  /* notice the closing empty array of courses above - this is called the 
  dependency array - it tells useEffect when to re-rerun - without it, the
  function runs on every rerender - with it, it only runs once*/

  /* When the courseStore changes, get a list of courses and update state*/
  function onChange() {
    /* Get courses from the API. When the call completes, store the array
    of courses in state */
    /* getCourses uses fetch's promise based api to handle async calls to
    get a list of courses */
    /* To handle a resolved promise, call .then - function will be called
    when the api call is completed */
    setCourses(courseStore.getCourses());
  }

  return (
    <>
      <h2>Courses</h2>
      {/* Client side button */}
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      {/* Pass the state object - an array of courses - into the child
      component */}
      <CourseList courses={courses} deleteCourse={deleteCourse} />
    </>
  );
}

export default CoursePage;
