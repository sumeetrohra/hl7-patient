import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Card, Button } from 'react-bootstrap';

const RequestCard = ({
  request: {
    medicalPractitionerFirstName,
    medicalPractitionerLastName,
    medicalPractitionerId,
    id
  }
}) => {
  const [error, setError] = useState('');

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
          }}
          onError={() => setError('Some error occured')}
        >
          {acceptAccessRequest => (
            <Button variant="primary" onClick={acceptAccessRequest}>
              Accept Request
            </Button>
          )}
        </Mutation>
        <Mutation
          mutation={DENY_REQUEST_MUTATION}
          variables={{ accessRequestId: id }}
          onCompleted={res => {
            console.log(res);
          }}
        >
          {denyAccessRequest => (
            <Button variant="danger" onClick={denyAccessRequest}>
              Deny Request
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
