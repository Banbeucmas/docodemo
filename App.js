import React, { Component } from 'react';
import { useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Keyboard
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';


MapboxGL.setAccessToken(
  'pk.eyJ1IjoidHhhMzEwIiwiYSI6ImNrdHR4aHVucjA1NGIyb3A4amU0cXppMXAifQ.Q_z-xTiDEIbD-DlzL0Wy6A',
);

function App() {
    const MAPBOXGL_TOKEN = ".json?access_token=pk.eyJ1IjoidHhhMzEwIiwiYSI6ImNrdHR4aHVucjA1NGIyb3A4amU0cXppMXAifQ.Q_z-xTiDEIbD-DlzL0Wy6A";
    const MAPBOXGL_URL="https://api.mapbox.com/geocoding/v5/mapbox.places/";

    const REC_URL = "https://api.opentripmap.com/0.1/en/places/bbox?";
    const REC_TOKEN = "5ae2e3f221c38a28845f05b6b58e5d7ef9d9b94cc6d9cd13713e8d01";
    const [text, setText] = useState();
    const [jsonRes, setSearchRes] = useState();
    const[coordinates, setCoordinates] = useState({'kd':138, 'vd':41 });
  
  const handleFunc = () =>{
    Keyboard.dismiss();
    getSearchResult();
    setText("");
  }

  const getSearchResult = async () => {
    console.log(MAPBOXGL_URL + encodeURI(text) + MAPBOXGL_TOKEN);
    let response = await fetch(
      MAPBOXGL_URL + encodeURI(text) + MAPBOXGL_TOKEN
    );
    let json = await response.json();
    setCoordinates({'kd':json.features[0].geometry.coordinates[0],'vd':json.features[0].geometry.coordinates[1]});
    // console.log(json);

    let TEST_URL = REC_URL + "lon_min=" +json.features[0].bbox[0]+"&"+ "lon_max=" +json.features[0].bbox[2]+ "&" + "lat_min="+ json.features[0].bbox[1]+ "&" + "lat_max=" + json.features[0].bbox[3]+"&apikey=" + REC_TOKEN;
    console.log(TEST_URL);
    let testresponse = await fetch(
      TEST_URL
    );
    let testjson = await testresponse.json();
    // console.log(testjson);
  }



  return (
    <View style={styles.container}>   
      <View
          style={styles.header}>
          <TextInput style={styles.input} placeholder={'search a place'} value={text} onChangeText={text => setText(text)} />
          <TouchableOpacity onPress={() => handleFunc()}>
            <View style={styles.button}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.map_container}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={15}
              centerCoordinate={[coordinates.kd, coordinates.vd ]}
            />
            <MapboxGL.PointAnnotation
                key="pointAnnotation"
                id="pointAnnotation"
                coordinate={[coordinates.kd, coordinates.vd ]}>
          </MapboxGL.PointAnnotation>
          </MapboxGL.MapView>
        </View>
      </SafeAreaView>
    
    </View>
  );
}
const styles = StyleSheet.create({
  map_container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  header:{
    marginLeft:20,
    height:100,
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems: 'center',
  },
  text:{
    marginTop: 30,
    marginLeft:20,
    fontWeight:'bold',
    fontSize:24,
  },
  input:{
    marginTop:10,
    width:'80%',
    marginRight:5,
    backgroundColor: '#FFF',
  },
  button:{
    backgroundColor:'#FFF',
  },
  addText:{
    height:50,
    width:50,
    fontWeight:'bold',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  result:{
    marginTop:30,
    marginLeft:30,
    height:'50%',
    width:'80%',
    backgroundColor:'#FFF',
  }
});

export default App;