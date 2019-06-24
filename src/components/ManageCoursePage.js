import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";

// Functional component using arrow functions
const ManageCoursePage = props => {
  // Not sure
  const [errors, setErrors] = useState({});

  const [courses, setCourses] = useState(courseStore.getCourses());

  // Define initial state for course
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    /* Connect to flux store */
    courseStore.addChangeListener(onChange);

    const slug = props.match.params.slug; // from the path `courses/:slug
    /* if there have been no courses rendered */
    if (courses.length === 0) {
      /* load courses from the store */
      courseActions.loadCourses();
    } else if (slug) {
      // gets the record identified by slug from the store, sets the state of the
      //course object to contain the record that was pulled from the api
      setCourse(courseStore.getCourseBySlug(slug));
    }
    /* remove change listener - function we return will be run when component
    is unmounted*/
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]); // Only rerun if props change

  /* Request a list of courses from course store and store in local state 
  using setCourses function that was declared above*/
  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function handleChange(event) {
    //To avoid mutating state, make a copy of the state object
    // and set the title property of the copy to the value passed in on the event
    // [event.target.name] is a computer property which allows us to set a property
    // based on a variable
    const updatedCourse = {
      ...course,
      [event.target.name]: event.target.value
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {}; // Store errors as an object

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);

    // Form is valid if the errors object has no properties
    // Object.keys returns array of keys. If the the length is 0, errors has
    // no properties(no errors have been thrown - great pattern here)
    return Object.keys(_errors).length === 0;
  }

  // Function which saves the data in the form
  function handleSubmit(event) {
    event.preventDefault(); //Handle form submission on client site to prevent postbacks
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      //Redirect using history
      props.history.push("/courses");
      toast.success("Course saved.");
    }); //Call api, pass it the course held in state
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
