import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

// This is the 'Action Creator' - it updates a course by id
export function saveCourse(course) {
  // Get a course asychronously from the API
  return courseApi.saveCourse(course).then(savedCourse => {
    // Dispatch an action to all registered stores
    dispatcher.dispatch({
      /* This is the action - create or update a course depending 
      on if an id is passed in with the course or not - an id is
      passed with an updated course but not a created course */
      actionType: course.id
        ? actionTypes.UPDATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse
    });
  });
}

// This is the 'Action Creator' - it gets all courses
export function loadCourses() {
  // Get all courses asychronously from the API to intialize the page
  return courseApi.getCourses().then(courses => {
    // Dispatch an action to all registered stores
    dispatcher.dispatch({
      // This is the action - load all courses
      actionType: actionTypes.LOAD_COURSES,
      courses: courses
    });
  });
}

// This is the 'Action Creator' - it deletes a course by id
export function deleteCourse(id) {
  // Deletes a course asychronously from the API to intialize the page
  return courseApi.deleteCourse(id).then(() => {
    // Dispatch an action to all registered stores
    dispatcher.dispatch({
      // This is the action - load all courses
      actionType: actionTypes.DELETE_COURSE,
      id: id
    });
  });
}
