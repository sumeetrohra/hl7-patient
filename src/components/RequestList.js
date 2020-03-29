import React from 'react';

import RequestCard from './RequestCard';

const PatientList = ({ requests, accessible, loadingStates }) => {
  return requests.map((request, i) => (
    <RequestCard key={i} request={request} loadingStates={loadingStates} />
  ));
};

export default PatientList;
