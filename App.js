import  React,{ Component } from 'react';
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
  Keyboard,
  Modal,
  Pressable,
  FlatList
} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';


MapboxGL.setAccessToken(
  'pk.eyJ1IjoidHhhMzEwIiwiYSI6ImNrdHR4aHVucjA1NGIyb3A4amU0cXppMXAifQ.Q_z-xTiDEIbD-DlzL0Wy6A',
);

function App() {
  const MAPBOXGL_TOKEN = ".json?access_token=pk.eyJ1IjoidHhhMzEwIiwiYSI6ImNrdHR4aHVucjA1NGIyb3A4amU0cXppMXAifQ.Q_z-xTiDEIbD-DlzL0Wy6A";
  const MAPBOXGL_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

  const REC_URL = "https://api.opentripmap.com/0.1/en/places/bbox?";
  const REC_TOKEN = "5ae2e3f221c38a28845f05b6b58e5d7ef9d9b94cc6d9cd13713e8d01";
  const [text, setText] = useState();
  const [jsonRes, setSearchRes] = useState({        'recname': [0] });
  const [coordinates, setCoordinates] = useState({ 'kd': 138, 'vd': 41 });
  const [showdest, setShowdest] = useState(false);
  
  const getSearchResult = async () => {
    console.log(MAPBOXGL_URL + encodeURI(text) + MAPBOXGL_TOKEN);
    let response = await fetch(
      MAPBOXGL_URL + encodeURI(text) + MAPBOXGL_TOKEN
    );
    let json = await response.json();
    // console.log(json);

    setCoordinates(()=>({ 'kd': json.features[0].geometry.coordinates[0], 'vd': json.features[0].geometry.coordinates[1] }));
    let TEST_URL = REC_URL + "lon_min=" + json.features[0].bbox[0] + "&" + "lon_max=" + json.features[0].bbox[2] + "&" + "lat_min=" + json.features[0].bbox[1] + "&" + "lat_max=" + json.features[0].bbox[3] + "&apikey=" + REC_TOKEN;
    console.log(TEST_URL);
    let testresponse = await fetch(
      TEST_URL
    );
    let testjson = await testresponse.json();

    let a=testjson.features.map(function(x){
      oco=Object.create({});
      oco.name=x.properties.name;
      return oco;}); //[{name:'Res A'},{name:''Res B'}]
    // console.log(a);
    // console.log('a'+jsonRes);

    // const updated=[...jsonRes.recname,1];
    // const updated_rec = {recname: a};
    // console.log(updated_rec);
  
 // console.log(coordinates);
  setSearchRes(()=>({'recname':a}));
 // console.log(" LAST "+jsonRes);

  }
  
  
  
  const handleFunc = () => {
    Keyboard.dismiss();
    getSearchResult();
    setText("");
    setShowdest(!showdest);
  }

 
  const renderItem = ({ item }) => (
    <View style={styles.item}>
  <Text style={styles.title}>{item.name}</Text>
</View>
);



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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showdest}
          // onRequestClose={() => {
          //   console.log("Modal has been closed.");
          //   setShowdest(!showdest);
          // }}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <FlatList
              data={jsonRes['recname']}
              renderItem={renderItem}
                />
              <Pressable style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setShowdest(!showdest);
                }}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <SafeAreaView>
        <View style={styles.map_container}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={15}
              centerCoordinate={[coordinates.kd, coordinates.vd]}
            />
            <MapboxGL.PointAnnotation
<<<<<<< Updated upstream
                key="pointAnnotation"
                id="pointAnnotation"
                coordinate={[coordinates.kd, coordinates.vd ]}>
          </MapboxGL.PointAnnotation>
=======
              key="pointAnnotation"
              id="pointAnnotation"
              coordinate={[coordinates.kd, coordinates.vd]}>
            </MapboxGL.PointAnnotation>
>>>>>>> Stashed changes
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
  header: {
    marginLeft: 20,
    height: 100,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  text: {
    marginTop: 30,
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 24,
  },
  input: {
    marginTop: 10,
    width: '80%',
    marginRight: 5,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#FFF',
  },
  addText: {
    height: 50,
    width: 50,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  result: {
    marginTop: 30,
    marginLeft: 30,
    height: '50%',
    width: '80%',
    backgroundColor: '#FFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  title: {
    fontSize: 32,
  }
});

export default App;