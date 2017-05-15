import * as types from './action-types';
import courseApi from '../api/mock-course-api';

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
    return function (dispatch) {
        return courseApi
            .getAllCourses()
            .then(courses => {
                dispatch(loadCoursesSuccess(courses));
            })
            .catch(error => {
                throw (error);
            });
    };
}

export function saveCourse(course) {
    return (dispatch, getState) => {
        return courseApi.saveCourse(course)
            .then(savedCourse => {
                course.id ?
                    dispatch(updateCourseSuccess(savedCourse)) :
                    dispatch(createCourseSuccess(saveCourse))
            })
            .catch(error => {
                throw (error);
            });
    };
}