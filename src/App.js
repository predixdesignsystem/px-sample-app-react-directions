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
