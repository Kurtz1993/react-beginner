import expect from 'expect';
import courseReducer from './course-reducer';
import * as actions from '../actions/course-actions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    // Arrange
    const initialState = [
      { title: 'A' },
      { title: 'B' }
    ];

    const newCourse = { title: 'C' };
    const action = actions.createCourseSuccess(newCourse);

    // Act
    const newState = courseReducer(initialState, action);

    // Assert
    expect(newState.length).toBe(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    // Arrange
    const initialState = [
      { id: 'A', title: 'A' },
      { id: 'B', title: 'B' },
      { id: 'C', title: 'C' }
    ];

    const course = { id: 'B', title: 'New Title' };
    const action = actions.updateCourseSuccess(course);

    // Act
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id === course.id);
    const untouchedCourse = newState.find(a => a.id === 'A');

    // Assert
    expect(updatedCourse.title).toBe('New Title');
    expect(untouchedCourse.title).toEqual('A');
    expect(newState.length).toEqual(3);
  });
});