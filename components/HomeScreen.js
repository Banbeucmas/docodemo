import React, {useState} from 'react';
import {ThemeProvider, SearchBar} from 'react-native-elements';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {View, Keyboard} from 'react-native';
import styles from './Styles';

const MAPBOXGL_TOKEN =
  '.json?access_token=pk.eyJ1IjoidHhhMzEwIiwiYSI6ImNrdHR4aHVucjA1NGIyb3A4amU0cXppMXAifQ.Q_z-xTiDEIbD-DlzL0Wy6A';
const MAPBOXGL_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const REC_URL = 'https://api.opentripmap.com/0.1/en/places/bbox?';
const REC_TOKEN = '5ae2e3f221c38a28845f05b6b58e5d7ef9d9b94cc6d9cd13713e8d01';

const HomeScreen = () => {
  const [text, setText] = useState();
  const [jsonRes, setSearchRes] = useState();
  const [coordinates, setCoordinates] = useState({kd: 138, vd: 41});
  const [recJson, setRecJson] = useState();

  const handleFunc = () => {
    Keyboard.dismiss();
    getSearchResult();
    setText('');
  };

  const getSearchResult = async () => {
    let response = await fetch(MAPBOXGL_URL + encodeURI(text) + MAPBOXGL_TOKEN);
    let json = await response.json();
    //location
    setCoordinates({
      kd: json.features[0].geometry.coordinates[0],
      vd: json.features[0].geometry.coordinates[1],
    });
    console.log(json);
    //get recommended points
    let lon_min = 0;
    let lon_max = 0;
    let lat_min = 0;
    let lat_max = 0;
    let r = 0.01;
    let number_of_places = 20;
    if (json.features[0].bbox == null) {
      lon_min = json.features[0].center[0] - r;
      lat_min = json.features[0].center[1] - r;
      lon_max = json.features[0].center[0] + r;
      lat_max = json.features[0].center[1] + r;
    } else {
      lon_min = json.features[0].bbox[0];
      lat_min = json.features[0].bbox[1];
      lon_max = json.features[0].bbox[2];
      lat_max = json.features[0].bbox[3];
    }
    let TEST_URL =
      REC_URL +
      'lon_min=' +
      lon_min +
      '&' +
      'lon_max=' +
      lon_max +
      '&' +
      'lat_min=' +
      lat_min +
      '&' +
      'lat_max=' +
      lat_max +
      '&limit=' +
      number_of_places +
      '&apikey=' +
      REC_TOKEN;
    console.log(TEST_URL);
    let rec_response = await fetch(TEST_URL);
    let rec_json = await rec_response.json();
    console.log(rec_json);
    setRecJson(rec_json);
  }

  return (
    <View style={{flex: 1}}>
      <SearchBar
        placeholder="Type your location"
        onChangeText={setText}
        value={text}
        containerStyle={{width: '100%'}}
        onSubmitEditing={() => handleFunc()}
      />

      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            zoomLevel={15}
            centerCoordinate={[coordinates.kd, coordinates.vd]}
          />
          <MapboxGL.PointAnnotation
            key="searchPoint"
            id="seatchPoint"
            coordinate={[coordinates.kd, coordinates.vd]}
          />

          {recJson
            ? recJson.features.map((item, index) => {
                return (
                  <MapboxGL.PointAnnotation
                    key={index + ''}
                    id={index + ''}
                    coordinate={[
                      item.geometry.coordinates[0],
                      item.geometry.coordinates[1],
                    ]}>
                    <View style={styles.recommendationMarker} />
                  </MapboxGL.PointAnnotation>
                );
              })
            : null}
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

export default HomeScreen;
