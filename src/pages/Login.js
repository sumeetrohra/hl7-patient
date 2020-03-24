import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { SET_PATIENT } from '../constants';
import { AuthContext } from '../AuthConfig';

const LoginPage = ({ history }) => {
  const handleSubmit = event => {
    event.preventDefault();
  };

  const { authDispatch } = useContext(AuthContext);

  const PATIENT_LOGIN_MUTATION = gql`
    mutation patientLogin($email: String!, $password: String!) {
      patientLogin(email: $email, password: $password) {
        token
      }
    }
  `;

  const _onLogin = data => {
    console.log(data);
    authDispatch({
      type: SET_PATIENT,
      payload: data.patientLogin
    });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      {error && <p>{error}</p>}
      <Mutation
        mutation={PATIENT_LOGIN_MUTATION}
        variables={{ email, password }}
        onCompleted={data => _onLogin(data)}
        onError={() => setError('Invalid email or password')}
      >
        {mutation => (
          <Button variant="primary" type="submit" onClick={mutation}>
            Submit
          </Button>
        )}
      </Mutation>
      <hr />
      <p>Not Patient?</p>
      <Button as="a" href="https://hl7-admin.netlify.com">
        Go To Admin Page
      </Button>
      {'  '}
      <Button as="a" href="https://hl7-mp.netlify.com">
        Go To Medical Practitioner Page
      </Button>
    </Form>
  );
};
export default LoginPage;
