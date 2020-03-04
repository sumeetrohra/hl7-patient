import React, { useEffect, useState } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import RequestList from '../components/RequestList';

const AccessRequests = ({ client }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function getRequests() {
      try {
        const result = await client.query({
          query: GET_PATIENT_QUERY,
          fetchPolicy: 'network-only'
        });
        setRequests(result.data.getPatientData.accessRequests);
      } catch (err) {
        console.error(err);
      }
    }
    getRequests();
  });

  const GET_PATIENT_QUERY = gql`
    query getPatientData {
      getPatientData {
        id
        accessRequests {
          id
          medicalPractitionerFirstName
          medicalPractitionerLastName
          medicalPractitionerId
        }
      }
    }
  `;

  return (
    <>
      <h3>Access Requests</h3>
      {requests.length > 0 && <RequestList requests={requests} />}
    </>
  );
};

export default withApollo(AccessRequests);
