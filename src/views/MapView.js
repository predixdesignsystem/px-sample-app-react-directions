import React, { Component } from 'react';
import Map from '../web-components/Map.js'
import LocationResult from '../components/LocationResult.js'
import LocationDetail from '../components/LocationDetail.js'
import debounce from 'lodash.debounce';
import './MapView.css';

const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const formatLocation = place => {
  const street = `${place.address || ''} ${place.text || ''}`.trim();
  const city = (place.context.find(p => /^place\./.test(p.id)) || {}).text || '';
  const state = (place.context.find(p => /^region\./.test(p.id)) || {}).text || '';
  return {street, city, state};
};

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.7749,
      lng: -122.4312,
      zoom: 13,
      findLocation: true,
      findDirections: false,
      findLocationText: '',
      endLocationText: '',
      findLocationData: null,
      endLocationData: null,
      searchSource: null,
      locationResults: [],
      markers: [],
      directionsRoute: null
    };
    /* Debounce calls to the Mapbox geocoder so we don't hit our API limits */
    this._debouncedUpdateLocationResults = debounce(this.updateLocationResults.bind(this), 500);
  }

  onMapMoved({lat, lng, zoom}) {
    if (this.state.lat !== lat || this.state.lng !== lng || this.state.zoom !== zoom) {
      this.setState({lat, lng, zoom});
    }
  }

  onFindLocationTextChanged(e) {
    const {value} = e.target;
    this.setState({ findLocationText: value, searchSource: 'FIND_LOCATION' });
    this._debouncedUpdateLocationResults();
  }

  onEndLocationTextChanged(e) {
    const {value} = e.target;
    this.setState({ endLocationText: value, searchSource: 'END_LOCATION' });
    this._debouncedUpdateLocationResults();
  }

  updateLocationResults() {
    const {searchSource} = this.state;
    let text = (searchSource === 'FIND_LOCATION') ? this.state.findLocationText : this.state.endLocationText;

    /* No text in search field */
    if (!text) {
      this.setState({ locationResults: [] });
    }
    /* Text in search field */
    else {
      const settings = {
        proximity: { latitude: this.state.lat, longitude: this.state.lng }
      };
      this.props.mapboxClient.geocodeForward(text, settings, (err, res) => {
        this.setState({
          locationResults: res.features.slice(0)
        });
      });
    }
  }

  onLocationResultClicked(place) {
    const [lng, lat] = place.center;
    const {street, city, state} = formatLocation(place);
    const {searchSource} = this.state;
    if (searchSource === 'FIND_LOCATION') {
      this.setState({
        locationResults: [],
        findLocationData: {street, city, state, lat, lng},
        lat,
        lng,
        zoom: 14
      }, this.updateDirectionsRoute.bind(this));
    }
    if (searchSource === 'END_LOCATION') {
      this.setState({
        locationResults: [],
        endLocationData: {street, city, state, lat, lng},
        lat,
        lng,
        zoom: 14
      }, this.updateDirectionsRoute.bind(this));
    }
  }

  setFindLocation() {
    this.setState({
      findLocation: true,
      findDirections: false,
      endLocationText: '',
      endLocationData: null,
      directionsRoute: null
    });
  }

  setFindDirections() {
    this.setState({
      findLocation: false,
      findDirections: true
    });
  }

  updateDirectionsRoute() {
    if (this.state.findLocationData && this.state.endLocationData) {
      const startLocation = {latitude: this.state.findLocationData.lat, longitude: this.state.findLocationData.lng};
      const endLocation = {latitude: this.state.endLocationData.lat, longitude: this.state.endLocationData.lng};
      this.props.mapboxClient.getDirections([startLocation,endLocation], (err, res) => {
        const directionsRoute = {
          type: 'FeatureCollection',
          features: [{
            id: 1,
            type: 'Feature',
            geometry: res.routes[0].geometry,
            properties: {}
          }]
        };
        this.setState({ directionsRoute });
      });
    }
    else {
      this.setState({ directionsRoute: null });
    }
  }

  render() {
    const {findLocation, findDirections, findLocationText, endLocationText, findLocationData, endLocationData, locationResults} = this.state;
    const search = findLocation ? (
        <input placeholder='Search for a location...' type='text' className='text-input input--regular' value={findLocationText} onChange={this.onFindLocationTextChanged.bind(this)} />
      ) : (
        <div>
          <label>Start at</label>
          <input placeholder='Enter a location to start at...' type='text' className='text-input input--regular' value={findLocationText} onChange={this.onFindLocationTextChanged.bind(this)} />
          <label className='u-mt+'>End at</label>
          <input placeholder='Enter a location to end at...' type='text' className='text-input input--regular' value={endLocationText} onChange={this.onEndLocationTextChanged.bind(this)} />
        </div>
      );

    const markers = [];
    if (findLocationData) markers.push({ lat: findLocationData.lat, lng: findLocationData.lng, type: 'info' });
    if (endLocationData) markers.push({ lat: endLocationData.lat, lng: endLocationData.lng, type: 'info' });

    return (
      <div className='map-view'>
        <Map
          lat={this.state.lat}
          lng={this.state.lng}
          zoom={this.state.zoom}
          tileLayerUrl={tileLayerUrl}
          onMapMoved={this.onMapMoved.bind(this)}
          markers={markers}
          geoJson={this.state.directionsRoute} />

        <div className='map-view-toolbar'>
          <div className='map-view-mode-buttons'>
            <button className={`btn ${findLocation ? 'btn--call-to-action' : ''}`} onClick={this.setFindLocation.bind(this)}>Find a location</button>
            <button className={`btn ${findDirections ? 'btn--call-to-action' : ''}`} onClick={this.setFindDirections.bind(this)}>Get directions</button>
          </div>
          <div className='map-view-search'>
            {search}
          </div>
          <div className='map-view-results'>
            {locationResults.length > 0 && locationResults.map(r => <LocationResult name={r.place_name} onClick={this.onLocationResultClicked.bind(this, r)} key={r.id} />)}
            {findLocationData && <LocationDetail street={findLocationData.street} city={findLocationData.city} state={findLocationData.state} />}
            {endLocationData && <LocationDetail street={endLocationData.street} city={endLocationData.city} state={endLocationData.state} />}
          </div>
        </div>
      </div>
    );
  }
}

export default MapView;
