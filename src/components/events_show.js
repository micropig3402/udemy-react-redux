import React, {Component} from 'react'; // jsxを使う際にこのReactは必要
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';

import {getEvent, deleteEvent, putEvent} from '../actions';

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  renderField(field) {
    const {
      input,
      label,
      type,
      meta: {touched, error},
    } = field;

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }

  async onDeleteClick() {
    const {id} = this.props.match.params;
    await this.props.deleteEvent(id);
    this.props.history.push('/');
  }

  async onSubmit(values) {
    // await this.props.postEvent(values);
    this.props.history.push('/');
  }

  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            label="Title"
            name="title"
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <Field
            label="Body"
            name="body"
            type="text"
            component={this.renderField}
          />
        </div>

        <div>
          <input
            type="submit"
            value="Submit"
            disabled={pristine || submitting}
          />
          <Link to="/">Cancel</Link>
          <Link to="/" onClick={this.onDeleteClick}>
            Delete
          </Link>
        </div>
      </form>
    );
  }
}

//何も入力されないのを防ぐvalidation
const validate = values => {
  const errors = {};

  if (!values.title) errors.title = 'Enter a title, please.';
  if (!values.body) errors.body = 'Enter a body, please.';

  return errors;
};

//stateの情報からこのコンポーネントに必要なpropsを取り出してこのコンポーネント内のpropsとしてmappingする機能を持つ関数
// const mapStateToProps = state => ({events: state.events});

//あるアクションが発生した時にreducerにtypeに応じた状態遷移を実行させるための関数
const mapDispatchToProps = {deleteEvent};

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({validate, form: 'eventShowForm'})(EventsShow));
