import React, { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const PatientDetails = ({ match, client, history }) => {
  const [patientDetails, setPatientDetails] = useState(null);

  useEffect(() => {
    async function getDetails() {
      const result = await client.query({
        query: GET_PATIENT_QUERY,
        fetchPolicy: 'network-only'
      });
      setPatientDetails(result.data.getPatientData);
    }
    getDetails();
  });

  const GET_PATIENT_QUERY = gql`
    query getPatientData {
      getPatientData {
        id
        lastName
        firstName
        middleName
        motherName
        dob
        bloodGroup
        sex
        religion
        maritalStatus
        primaryLanguage
        birthPlace
        address
        countryCode
        occupation
        contact1
        contact2
        email
        socioEconomicStatus
        immunizationStatus
        allergyStatus
        organDonorStatus
        PMH
        DHx
        Ca
        IDDM
        NIDDM
        MI
        AF
        registeredAt
        careProvider {
          firstName
          lastName
          middleName
          address
          cityId
          pinCode
          countryCode
          contact1
          email
        }
        insurance {
          id
          status
          companyName
        }
        patientCase {
          id
          mp {
            id
            mpId
            lastName
            firstName
            middleName
            email
          }
          icdCode {
            id
            icdCode
            commonName
          }
          icdSubCode {
            id
            icdSubCode
            scientificName
          }
          hospital {
            id
            name
          }
          HPC
          MoI
          DnV
          clinicNote
          diagnosisType
          currentClinicalStatus
          createdAt
          records {
            id
            visitNo
            encounterDate
            mp {
              id
              mpId
              lastName
              firstName
              middleName
              email
            }
            hospital {
              id
              name
            }
            observation
            Tx
            suggesstions
            cevsSp
            cevsDp
            cePr
            ceRr
            ceHeight
            ceWeight
            medication
            advice
            query
            followUpObservation
          }
        }
      }
    }
  `;

  const records =
    patientDetails && patientDetails.patientCase
      ? patientDetails.patientCase.records
      : null;

  return (
    <>
      <h3>Patient Details</h3>

      {patientDetails && (
        <>
          <MSHMessage
            version="2.5"
            countryCode={patientDetails.countryCode}
            language="English"
          />
          <PIDMessage patientDetails={patientDetails} />
        </>
      )}
      {patientDetails &&
        patientDetails.patientCase &&
        records.length > 0 &&
        records.map((record, index) => (
          <EVNMessage key={index} record={record} />
        ))}
      {patientDetails && patientDetails.careProvider && (
        <NK1Message careProvider={patientDetails.careProvider} />
      )}
      {patientDetails && patientDetails.patientCase && patientDetails && (
        <DG1Message patientCase={patientDetails.patientCase} />
      )}
      {patientDetails && !patientDetails.careProvider ? (
        <Button onClick={() => history.push('/add/careprovider')}>
          Add Care Provider
        </Button>
      ) : (
        <Button onClick={() => history.push('/add/careprovider')}>
          Update Care Provider
        </Button>
      )}
      {patientDetails && !patientDetails.insurance ? (
        <Button onClick={() => history.push('/add/insurance')}>
          Add Insurance
        </Button>
      ) : (
        <Button onClick={() => history.push('/add/insurance')}>
          Update Insurance
        </Button>
      )}
    </>
  );
};

export default withRouter(withApollo(PatientDetails));

// message header
const MSHMessage = ({ version, countryCode, language }) => {
  return (
    <p>{`MSH | ^ ~ \\ & | | | | | ${Date.now()} | | | | | ${version} | | | | | ${countryCode} | | ${language}`}</p>
  );
};

// patient details
const PIDMessage = ({ patientDetails }) => {
  const {
    id,
    lastName,
    firstName,
    middleName,
    motherName,
    dob,
    sex,
    address,
    countryCode,
    contact1,
    contact2,
    primaryLanguage,
    maritalStatus,
    religion,
    birthPlace
  } = patientDetails;
  return (
    <p>{`PID | ${id} | | | | ${lastName}^${firstName}^${middleName} | ${motherName} | ${dob} | ${sex} | | | ${address} | ${countryCode} | ${contact1} | ${contact2} | ${primaryLanguage} | ${maritalStatus} | ${religion} | | | | | ${birthPlace} | |  | ${countryCode} | | ${countryCode}`}</p>
  );
};

// care provider
const NK1Message = ({ careProvider }) => {
  const {
    firstName,
    lastName,
    middleName,
    address,
    contact1,
    email,
    countryCode
  } = careProvider;
  return (
    <p>{`NK1 | ${lastName}^${firstName}^${middleName} | | ${address} | ${contact1} | ${email} | | | | | | | | | | | | | ${countryCode} | | | | | | | | ${countryCode} | | | | | | | | | | `}</p>
  );
};

// patient case
const DG1Message = ({ patientCase }) => {
  const {
    id,
    icdCode: { icdCode },
    icdSubCode: { icdSubCode },
    mp
  } = patientCase;
  return (
    <p>{`DG1 | ${id} | ICD | ${icdCode} - ${icdSubCode} | | | | | | | | | | | | | ${mp.id}`}</p>
  );
};

// records
// TODO: <p>EVN</p> missing
const EVNMessage = ({ record }) => {
  const {
    id,
    encounterDate,
    cevsSp,
    cevsDp,
    cePr,
    ceRr,
    ceHeight,
    ceWeight
  } = record;
  return (
    <>
      <p>{`OBX | ${id} | | 1 | | ${cevsSp} | mm of Hg | | | | | | | | '${encounterDate}' UTC`}</p>
      <p>{`OBX | ${id} | | 1 | | ${cevsDp} | mm of Hg | | | | | | | | '${encounterDate}' UTC`}</p>
      <p>{`OBX | ${id} | | 1 | | ${cePr} | beats per minute | | | | | | | | '${encounterDate}' UTC`}</p>
      <p>{`OBX | ${id} | | 1 | | ${ceRr} | breaths per minute | | | | | | | | '${encounterDate}' UTC`}</p>
      <p>{`OBX | ${id} | | 1 | | ${ceHeight} | cm | | | | | | | | '${encounterDate}' UTC`}</p>
      <p>{`OBX | ${id} | | 1 | | ${ceWeight} | kg | | | | | | | | '${encounterDate}' UTC`}</p>
    </>
  );
};
