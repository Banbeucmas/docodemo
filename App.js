/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import RecommendationScreen from './components/Recommendation';
import PlannerScreen from './components/Planner';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, View, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
// import Kontext from './components/Kontext';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoieXV0YWRpbmgiLCJhIjoiY2t0c25pcnlvMHp3MTJubXg0cWI3eXhzMiJ9.rb0f5Gz3jef0VIwieUFAYQ',
);


const Tab = createBottomTabNavigator();
// const [text, setText] = useState(); //Home
// const [jsonRes, setSearchRes] = useState();
// const [coordinates, setCoordinates] = useState({kd: 138, vd: 41});
// const [recJson, setRecJson] = useState(); //recommendation points, HomeScreen and RecScreen
// const [chosenPlace, setChosenPlace]=useState([]);
// const [route, setRoute] = useState();
// const points=[]; //collection of search points, gained from HomeScreen

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
     {/* <Kontext.Provider value={Tab}> */}
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
          <Tab.Screen name="Recommendation" component={RecommendationScreen} />
        </Tab.Navigator>
      </NavigationContainer>
   {/* //   </Kontext.Provider> */}
    </SafeAreaView>
  );
}
