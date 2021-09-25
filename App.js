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
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoieXV0YWRpbmgiLCJhIjoiY2t0c25pcnlvMHp3MTJubXg0cWI3eXhzMiJ9.rb0f5Gz3jef0VIwieUFAYQ',
);

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
  const [search, updateSearch] = useState('');

  return (
    <View style={{flex: 1}}>
      <SearchBar
        placeholder="Type your location"
        onChangeText={updateSearch}
        value={search}
        containerStyle={{width: '100%'}}
      />

      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
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
