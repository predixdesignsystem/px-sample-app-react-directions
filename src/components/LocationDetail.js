import React from 'react';
import './LocationDetail.css';

const LocationDetail = props => {
  const detail = [props.city, props.state].filter(t => t !== '');
  return (
    <div className='location-detail'>
      <p className='location-detail-street'>{props.street}</p>
      <p className='location-detail-location'>{detail.join(', ')}</p>
    </div>
  );
}

export default LocationDetail;
