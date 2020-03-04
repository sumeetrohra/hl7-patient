import React from 'react';

import RequestCard from './RequestCard';

const PatientList = ({ requests, accessible }) => {
  return requests.map((request, i) => (
    <RequestCard key={i} request={request} />
  ));
};

export default PatientList;
