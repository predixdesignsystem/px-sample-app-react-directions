import React from 'react';
import './LocationResult.css';

const LocationResult = props => {
  return (
    <div className='location-result' onClick={props.onClick}>
      {props.name}
    </div>
  );
}

export default LocationResult;
