import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import Spinner from '../components/Spinner';

const AddInsurance = ({ history }) => {
  const [insuranceStatus, setInsuranceStatus] = useState(null);
  const [name, setName] = useState('');

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const ADD_INSURANCE_MUTATION = gql`
    mutation addInsurance($status: Boolean!, $companyName: String!) {
      addInsurance(status: $status, companyName: $companyName) {
        id
      }
    }
  `;

  return (
    <>
      <h3>Add Insurance</h3>
      <Form>
        <Form.Group>
          <Form.Label>Insurance Status</Form.Label>
          <Form.Control
            as="select"
            value={insuranceStatus}
            onChange={e => setInsuranceStatus(Boolean(e.target.value))}
            required
          >
            <option>Select one...</option>
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </Form.Group>
        <p style={{ color: 'red' }}>{error}</p>
        <Mutation
          mutation={ADD_INSURANCE_MUTATION}
          variables={{ status: insuranceStatus, companyName: name }}
          onCompleted={() => {
            setError();
            setLoading(false);
            history.push('/');
          }}
          onError={error => console.error(error)}
        >
          {addInsurance => (
            <Button
              variant="primary"
              style={{ opacity: loading ? 0.7 : 1 }}
              disabled={loading ? true : false}
              onClick={() => {
                setError();
                if (insuranceStatus && name) {
                  setLoading(true);
                  addInsurance();
                } else {
                  setError('please enter all details first');
                }
              }}
            >
              {loading ? <Spinner /> : 'Add Insurance'}
            </Button>
          )}
        </Mutation>
      </Form>
    </>
  );
};

export default withRouter(AddInsurance);
