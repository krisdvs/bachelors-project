/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import { Col, Row } from 'react-flexbox-grid';
import { Message } from 'semantic-ui-react';
import { Alert } from '../elements';
import { signUp as signUpAction } from '../../api/auth';
import style from './styles.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      company: '',
      validationError: null,
      loading: false,
      successMessage: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setError(validationError = null) {
    this.setState({ validationError });
  }

  handleSignUp() {
    const {
      firstName, lastName, company, email, password,
    } = this.state;

    const { route, push } = this.props;

    this.setState({ loading: true });
    signUpAction({
      firstName, lastName, company, email, password,
    })
      .then(({ data: { message } }) => {
        this.setState({
          successMessage: message,
          loading: false,
        }, () => {
          setTimeout(() => push(route), 5000);
        });
      })
      .catch((e) => {
        this.setError(e.toString());
        this.setState({ loading: false });
      });
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setError();

    if (this.validateForm()) {
      this.handleSignUp();
    }
  }

  validateForm() {
    const {
      firstName, lastName, company, email, password,
    } = this.state;

    const schema = Joi.object().keys({
      firstName: Joi.string()
        .required()
        .error(new Error('Invalid first name format.')),
      lastName: Joi.string()
        .required()
        .error(new Error('Invalid last name format.')),
      company: Joi.string()
        .required()
        .error(new Error('Invalid company format.')),
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required()
        .error(new Error('Invalid email format.')),
      password: Joi.string()
        .required()
        .error(new Error('Password is required.')),
    });

    const result = Joi.validate({
      firstName, lastName, company, email, password,
    }, schema);

    if (result.error && result.error.message) {
      this.setState({
        validationError: result.error.message,
      });
    }
    return !result.error;
  }

  render() {
    const {
      firstName, lastName, company, email, password, validationError, loading, successMessage,
    } = this.state;

    console.log(successMessage);

    return (
      <section className={style.signUp}>
        <div className={style.container}>
          <Row center="xs">
            <Col xs={12} sm={12} md={12} lg={12}>
              <h2><span className={style.primaryText}>Sign</span>Up</h2>
              <form onSubmit={this.handleSubmit}>
                <Alert
                  className={validationError
                    ? style.message
                    : style.hidden}
                  message={validationError}
                />
                {successMessage && (
                  <div className={style.message}>
                    <Message positive content={successMessage} />
                  </div>
                )}
                <div>
                  <label htmlFor="firstName">First name</label>
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={firstName}
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={lastName}
                  />
                </div>
                <div>
                  <label htmlFor="company">Company</label>
                  <input
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="Company"
                    name="company"
                    value={company}
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.handleInputChange}
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.handleInputChange}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                  />
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  onSubmit={this.handleSubmit}
                  name="button"
                >
                  SignUp
                </button>
              </form>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

SignUp.propTypes = {
  route: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
};

export default SignUp;
