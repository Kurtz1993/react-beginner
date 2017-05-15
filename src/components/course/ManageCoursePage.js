import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/course-actions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {}
    };
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
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

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