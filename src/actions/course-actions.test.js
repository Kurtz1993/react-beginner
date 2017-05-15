import expect from 'expect';
import * as courseActions from './course-actions';
import * as types from './action-types';

describe('Course Actions', () => {
  describe('createCourseSuccess', () => {
    it('should create a CREATE_COURSE_SUCCESS action', () => {
      const course = {id:'clean-code', title: 'Clean Code'};
      const expectedACtion = {
        type: types.CREATE_COURSE_SUCCESS,
        course
      };

      const action = courseActions.createCourseSuccess(course);

      expect(action).toEqual(expectedACtion);
    });
  });
});