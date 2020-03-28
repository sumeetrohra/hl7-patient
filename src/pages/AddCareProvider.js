import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import { validateEmail, validatePhoneNumber } from '../utils';
import Spinner from '../components/Spinner';

const AddCareProvider = ({ history }) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [midName, setMidname] = useState('');
  const [address, setAddress] = useState('');
  const [contact1, setContact1] = useState('');
  const [email, setEmail] = useState('');
  const [cityId, setCityId] = useState();
  const [stateId, setStateId] = useState();
  const [pinCode, setPinCode] = useState();
  const [countryCode, setCountryCode] = useState();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const ADD_CARE_PROVIDER_MUTATION = gql`
    mutation addCareProvider(
      $firstName: String!
      $lastName: String!
      $middleName: String!
      $address: String!
      $cityId: Int!
      $stateId: Int!
      $pinCode: Int!
      $countryCode: Int!
      $contact1: String!
      $email: String!
    ) {
      addCareProvider(
        firstName: $firstName
        lastName: $lastName
        middleName: $middleName
        address: $address
        cityId: $cityId
        stateId: $stateId
        pinCode: $pinCode
        countryCode: $countryCode
        contact1: $contact1
        email: $email
      ) {
        id
      }
    }
  `;

  return (
    <>
      <h3>Add Care Provider</h3>
      <Form>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={fname}
            onChange={e => setFname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lname}
            onChange={e => setLname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type="text"
            value={midName}
            onChange={e => setMidname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City Id</Form.Label>
          <Form.Control
            type="number"
            value={cityId}
            onChange={e => setCityId(Number(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>State Id</Form.Label>
          <Form.Control
            type="number"
            value={stateId}
            onChange={e => setStateId(Number(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Pin code</Form.Label>
          <Form.Control
            type="number"
            value={pinCode}
            onChange={e => setPinCode(Number(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country code</Form.Label>
          <Form.Control
            type="number"
            value={countryCode}
            onChange={e => setCountryCode(Number(e.target.value))}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            value={contact1}
            onChange={e => setContact1(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <p style={{ color: 'red' }}>{error}</p>
        <Mutation
          mutation={ADD_CARE_PROVIDER_MUTATION}
          variables={{
            firstName: fname,
            lastName: lname,
            middleName: midName,
            address: address,
            cityId: cityId,
            stateId: stateId,
            pinCode: pinCode,
            countryCode: countryCode,
            contact1: contact1,
            email: email
          }}
          onCompleted={() => {
            setError();
            setLoading(false);
            history.push('/');
          }}
          onError={error => console.error(error)}
        >
          {addCareProvider => (
            <Button
              variant="primary"
              style={{ opacity: loading ? 0.7 : 1 }}
              disabled={loading ? true : false}
              onClick={() => {
                setError();
                if (
                  fname &&
                  lname &&
                  midName &&
                  address &&
                  cityId &&
                  stateId &&
                  pinCode &&
                  countryCode &&
                  validatePhoneNumber(contact1) &&
                  validateEmail(email)
                ) {
                  setLoading(true);
                  addCareProvider();
                } else {
                  setError('please enter all details first');
                }
              }}
            >
              {loading ? <Spinner /> : 'Add Care Provider'}
            </Button>
          )}
        </Mutation>
      </Form>
    </>
  );
};

export default withRouter(AddCareProvider);
