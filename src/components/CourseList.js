/* This is the child component or dumb component which does nothing but 
defines markup and recieves an array of courses via props to keep it easier 
to understand and test in isolation */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Parent component passes in props argument
function CourseList(props) {
  const Msg = ({ closeToast }) => <div>Record has been deleted</div>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author ID</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {/* Map returns a  new array, this code returns an array of rows
          Map is used in Javascript to iterate over arrays*/}
        {props.courses.map(course => {
          return (
            <tr key={course.id}>
              <ToastContainer autoClose={3000} hideProgressBar />
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    toast.success(<Msg />);
                    props.deleteCourse(course.id);
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorId}</td>
              <td>{course.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// Lowecase p - since were declaring a property
/*  This component expects to be passed an array of courses 
and if not get a runtime error in development */
CourseList.propTypes = {
  deleteCourse: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired
};

/* If component does not recieve a course prop, it will default
courses to an empty array */
CourseList.defaultProps = {
  courses: []
};

export default CourseList;
