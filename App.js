/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {ThemeProvider, SearchBar} from 'react-native-elements';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, View, StyleSheet, Text, Keyboard} from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoieXV0YWRpbmgiLCJhIjoiY2t0c25pcnlvMHp3MTJubXg0cWI3eXhzMiJ9.rb0f5Gz3jef0VIwieUFAYQ',
);

const MAPBOXGL_TOKEN =
  '.json?access_token=pk.eyJ1IjoidHhhMzEwIiwiYSI6ImNrdHR4aHVucjA1NGIyb3A4amU0cXppMXAifQ.Q_z-xTiDEIbD-DlzL0Wy6A';
const MAPBOXGL_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const REC_URL = 'https://api.opentripmap.com/0.1/en/places/bbox?';
const REC_TOKEN = '5ae2e3f221c38a28845f05b6b58e5d7ef9d9b94cc6d9cd13713e8d01';

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },

  container: {
    width: '100%',
    height: '100%',
  },

  tab: {
    backgroundColor: 'blue',
    width: '100%',
  },
});

function PlannerScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

/*
      <SearchBar
          placeholder="Type your location"
          onChangeText={updateSearch}
          value={search}
        />

        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} />
        </View>
        */

function HomeScreen({navigation}) {
  const [text, setText] = useState();
  const [coordinates, setCoordinates] = useState({kd: 138, vd: 41});
  const handleFunc = () => {
    Keyboard.dismiss();
    getSearchResult();
    setText('');
  };

  const getSearchResult = async () => {
    console.log(MAPBOXGL_URL + encodeURI(text) + MAPBOXGL_TOKEN);
    let response = await fetch(MAPBOXGL_URL + encodeURI(text) + MAPBOXGL_TOKEN);
    let json = await response.json();
    setCoordinates({
      kd: json.features[0].geometry.coordinates[0],
      vd: json.features[0].geometry.coordinates[1],
    });
    // console.log(json);

    let TEST_URL =
      REC_URL +
      'lon_min=' +
      json.features[0].bbox[0] +
      '&' +
      'lon_max=' +
      json.features[0].bbox[2] +
      '&' +
      'lat_min=' +
      json.features[0].bbox[1] +
      '&' +
      'lat_max=' +
      json.features[0].bbox[3] +
      '&apikey=' +
      REC_TOKEN;
    console.log(TEST_URL);
    let testresponse = await fetch(TEST_URL);
    let testjson = await testresponse.json();
    // console.log(testjson);
  };

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
            key="pointAnnotation"
            id="pointAnnotation"
            coordinate={[coordinates.kd, coordinates.vd]}
          />
        </MapboxGL.MapView>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen name="Planner" component={PlannerScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
