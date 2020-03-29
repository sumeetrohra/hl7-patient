import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Card, Button } from 'react-bootstrap';

import Spinner from '../components/Spinner';

const RequestCard = ({
  request: {
    medicalPractitionerFirstName,
    medicalPractitionerLastName,
    medicalPractitionerId,
    id
  },
  loadingStates
}) => {
  const [error, setError] = useState('');

  const { loading, setLoading } = loadingStates;

  const ACCEPT_REQUEST_MUTATION = gql`
    mutation acceptAccessRequest($accessRequestId: String!) {
      acceptAccessRequest(accessRequestId: $accessRequestId) {
        id
      }
    }
  `;

  const DENY_REQUEST_MUTATION = gql`
    mutation denyAccessRequest($accessRequestId: String!) {
      denyAccessRequest(accessRequestId: $accessRequestId) {
        id
      }
    }
  `;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{`${medicalPractitionerFirstName} ${medicalPractitionerLastName}`}</Card.Title>
        <Card.Text>{`Medical practitioner id: ${medicalPractitionerId}`}</Card.Text>
        {error && <p>{error}</p>}
        <Mutation
          mutation={ACCEPT_REQUEST_MUTATION}
          variables={{ accessRequestId: id }}
          onCompleted={res => {
            console.log(res);
            setLoading(false);
          }}
          onError={() => {
            setError('Some error occurred');
            setLoading(false);
          }}
        >
          {acceptAccessRequest => (
            <Button
              variant="primary"
              style={{ opacity: loading ? 0.7 : 1 }}
              disabled={loading ? true : false}
              onClick={() => {
                setLoading(true);
                acceptAccessRequest();
              }}
            >
              {loading ? <Spinner /> : 'Accept Request'}
            </Button>
          )}
        </Mutation>
        {'  '}
        <Mutation
          mutation={DENY_REQUEST_MUTATION}
          variables={{ accessRequestId: id }}
          onCompleted={res => {
            console.log(res);
            setLoading(false);
          }}
          onError={() => {
            setError('Some error occurred');
            setLoading(false);
          }}
        >
          {denyAccessRequest => (
            <Button
              variant="danger"
              style={{ opacity: loading ? 0.7 : 1 }}
              disabled={loading ? true : false}
              onClick={() => {
                setLoading(true);
                denyAccessRequest();
              }}
            >
              {loading ? <Spinner /> : 'Deny Request'}
            </Button>
          )}
        </Mutation>
      </Card.Body>
    </Card>
  );
};

export default RequestCard;

// {!accessible ? (

// ) : (
//   <Button
//     variant="primary"
//     onClick={() => history.push(`/patient/${id}`)}
//   >
//     Get patient details
//   </Button>
// )}
