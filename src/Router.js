import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { AuthContext } from './AuthConfig';
import { PATIENT, SET_PATIENT } from './constants';

import PatientDetails from './pages/PatientDetails';
import Login from './pages/Login';
import AccessRequests from './pages/AccessRequests';
import AddInsurance from './pages/AddInsurance';
import AddCareProvider from './pages/AddCareProvider';

const Router = () => {
  const { authState, authDispatch } = useContext(AuthContext);

  const patient = localStorage.getItem(PATIENT);

  useEffect(() => {
    if (patient) {
      authDispatch({
        type: SET_PATIENT,
        payload: JSON.parse(patient)
      });
    }
  }, [authDispatch, patient]);

  return (
    <Switch>
      {authState && authState.token ? (
        <>
          <Route exact path="/" component={PatientDetails} />
          <Route exact path="/requests" component={AccessRequests} />
          <Route exact path="/add/careprovider" component={AddCareProvider} />
          <Route exact path="/add/insurance" component={AddInsurance} />
          <Route path="/*" render={() => <Redirect to="/" />} />
        </>
      ) : (
        <>
          <Route exact path="/login" component={Login} />
          <Route path="*" render={() => <Redirect to="/login" />} />
        </>
      )}
    </Switch>
  );
};

export default Router;
