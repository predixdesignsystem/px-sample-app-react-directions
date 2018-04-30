/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
