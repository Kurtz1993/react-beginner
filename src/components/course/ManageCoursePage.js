import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/course-actions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      isSaving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course });
  }

  saveCourse(event) {
    this.setState({ isSaving: true });
    event.preventDefault();
    this.props
      .actions
      .saveCourse(this.state.course)
      .then(() => this.redirect());
  }

  redirect() {
    toastr.success('Course saved!');
    this.setState({ isSaving: false });
    this.context.router.push('/courses');
  }

  render() {
    const {
      course,
      errors
    } = this.state;

    return (
      <CourseForm
        allAuthors={this.props.authors}
        course={course}
        errors={errors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        isSaving={this.state.isSaving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(c => c.id === id);
  if (course) return course[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id;
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: `${author.firstName} ${author.lastName}`
    };
  });

  return { course, authors: authorsFormattedForDropdown };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);