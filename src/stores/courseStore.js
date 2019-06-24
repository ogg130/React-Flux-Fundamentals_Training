import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _courses = []; //Private data - data in store must be accessed via public api

class CourseStore extends EventEmitter {
  // By convention each flux store should have 3 functions:

  /* 1) addChangeListener
     allows React components to subscribe to our store so that
     they're notified when changes occur */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  /* 2) removeChangeListener
    allows React components to unsubscribe from the store */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  /* 3) emitChange - emit a change event*/
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /* Expose the courses private data through the public api */
  getCourses() {
    return _courses; // Concept - SQL table
  }

  /* recieve a slug then look through array of courses to find course that matches slug */
  getCourseBySlug(slug) {
    //Predicate - fancy word for a function that returns a boolean
    return _courses.find(course => course.slug === slug); // Concept - SQL view
  }
}

const store = new CourseStore();

// Register the store with the dispatcher
Dispatcher.register(action => {
  /* This gets called any time an action is dispatched
    Every store that registers with the dispatcher is notified
    of every single action by default - so we build logic to 
    swith based on actionType being passed*/
  switch (action.actionType) {
    case actionTypes.CREATE_COURSE:
      // Take new course passed with action and push into private array of courses
      _courses.push(action.course);

      /*Always emit change to notify and update UI of change */
      store.emitChange();
      break;
    case actionTypes.DELETE_COURSE:
      /* iterate over all courses and filter out any course using id parsed as base
        the base 10 integer - return new array of courses with one less in it */
      _courses = _courses.filter(
        course => course.id !== parseInt(action.id, 10)
      );
      store.emitChange();
      break;
    case actionTypes.LOAD_COURSES:
      /* Load all courses */
      _courses = action.courses;
      store.emitChange();
      break;
    case actionTypes.UPDATE_COURSE:
      /* map over array of courses and replace the course we want to update
       ternary = syntax to replace the course if an update is necessary */
      _courses = _courses.map(course =>
        course.id === action.course.id ? action.course : course
      );
      store.emitChange();
      break;
    default:
    /* nothing to do here - every stores dispatcher recieves every action
          so this means some action occured that this store doesnt care about */
  }
});

export default store;
