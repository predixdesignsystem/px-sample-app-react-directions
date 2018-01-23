import React, { Component } from 'react';

/** Checks that two objects are shallow equal */
const shallowEqualObject = (a, b) => {
  const akeys = Object.keys(a);
  const bkeys = Object.keys(b);
  if (!shallowEqualArray(akeys, bkeys)) return false;
  for (let i=0; i<akeys.length; i++) {
    if (a[akeys[i]] !== b[bkeys[i]]) {
      return false;
    }
  }
  return true;
};

/** Checks that two arrays are shallow equal */
const shallowEqualArray = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i=0; i<a.length; i++) {
    if (b.indexOf(a[i]) === -1) {
      return false;
    }
  }
  return true;
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemRef: null
    };

    this._onMapMoved = this._onMapMoved.bind(this);
    this._markers = [];
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.$map.addEventListener('px-map-moved', this._onMapMoved);
    this.updateMapProps(this.$map, this.props);
    this.updateMarkers(this.$map, this.props.markers);
    this.$geoJsonLayer.data = this.props.geoJson;
    this.$tileLayer.url = this.props.tileLayerUrl;
  }

  componentWillUnmount() {
    this.$map.removeEventListener('px-map-moved', this._onMapMoved);
  }

  componentWillReceiveProps(nextProps) {
    this.updateMapProps(this.$map, nextProps);
    this.updateMarkers(this.$map, nextProps.markers);
    this.$geoJsonLayer.data = nextProps.geoJson;
    this.$tileLayer.url = nextProps.tileLayerUrl;
  }

  updateMapProps(el, props) {
    el.lat = props.lat;
    el.lng = props.lng;
    el.zoom = props.zoom;
  }

  updateMarkers(el, markerData) {
    if (!markerData || !Array.isArray(markerData)) return;
    if (!markerData.length && this._markers.length) {
      this._markers.forEach(m => {
        el.removeChild(m);
      });
      this._markers = [];
    }
    markerData.forEach((m,i) => {
      if (!this._markers[i]) {
        // Create a new marker
        const marker = document.createElement('px-map-marker-static');
        marker.setAttribute('lat', m.lat);
        marker.setAttribute('lng', m.lng);
        marker.setAttribute('type', m.type || 'info');
        el.appendChild(marker);
        this._markers[i] = marker;
      }
      if (!shallowEqualObject(m, this._markers[i])) {
        // Update existing marker
        this._markers[i].lat = m.lat;
        this._markers[i].lng = m.lng;
        this._markers[i].type = m.type || 'info';
      }
    });
  }

  _onMapMoved(e) {
    if (this.props.onMapMoved) {
      const {lat, lng, zoom} = e.detail;
      if (this.props.lat !== lat || this.props.lng !== lng || this.props.zoom !== zoom) {
        this.props.onMapMoved({lat, lng, zoom})
      }
    }
  }

  render() {
    return (
      <px-map flex-to-size ref={n => {this.$map = n}}>
        <px-map-tile-layer ref={n => this.$tileLayer = n}></px-map-tile-layer>
        <px-map-layer-geojson ref={n => this.$geoJsonLayer = n} feature-style='{"color":"#3E87E8"}'></px-map-layer-geojson>
      </px-map>
    );
  }
}

export default Map;
