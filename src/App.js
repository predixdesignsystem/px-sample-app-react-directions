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

import React, { Component } from 'react';
import BrandingBar from './web-components/BrandingBar';
import MapView from './views/MapView';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationTitle: 'Predix Design System Directions App'
    };
    /*eslint-disable no-undef*/
    this.mapboxClient = new MapboxClient('pk.eyJ1IjoiZGF2aWRybGVvbmFyZCIsImEiOiJjamNsN2VnYzUwNG16MzNreGppbGpqcHd0In0.GcQvoKtssuPIrW3AVmPR9g');
    /*eslint-enable no-undef*/
  }

  syncRouteToURL(route) {
    const pathname = `/${route.join('/')}`;
    if (this.props.location.pathname !== pathname) {
      this.props.history.push(pathname);
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <BrandingBar applicationTitle={this.state.applicationTitle} />
        </div>
        <div className="app-content">
          <MapView mapboxClient={this.mapboxClient} />
        </div>
      </div>
    );
  }
}

export default App;
