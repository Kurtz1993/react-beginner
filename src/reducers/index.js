import { combineReducers } from 'redux';
import courses from './course-reducer';
import authors from './author-reducer';
import ajaxCallsInProgress from './ajax-status-reducer';

const rootReducer = combineReducers({
    courses,
    authors,
    ajaxCallsInProgress
});

export default rootReducer;