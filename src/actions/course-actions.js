import * as types from  './action-types';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course };
}