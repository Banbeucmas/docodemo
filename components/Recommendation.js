import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import Place from './Place';

export default function RecommendationScreen() {
  const [point, setPoint] = useState(['Tokyo', 'Akabane', 'Okinawa']); //collection of recommendation points
  const [chosenPlace, setChosenPlace] = useState([]);

  const points = []
  const convertplacetochosen = (place,index) => {
    setChosenPlace([...chosenPlace, place]);
    completeplace(index);
  }

  const completeplace = (index) => {
    let itemsCopy = [...point];
    // console.log('Recommend place', point);
    console.log('Recommend place', point);
    itemsCopy.splice(index, 1); //bug here
    setPoint(itemsCopy)
    console.log('Chosen place', chosenPlace);
  }


  const convertplacetorecommendation = (place,index) => {

    removeplan(index);
    setPoint([...point, place]);
  }
  const removeplan = (index) => {
    let itemsCopy = [...chosenPlace];
    // console.log('Recommend place', point);
    console.log('Chosen place', chosenPlace);
    itemsCopy.splice(index, 1); // bug here
    setChosenPlace(itemsCopy)
    console.log('Recommend place', point);
  }




  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.placesWrapper}>
          <Text style={styles.sectionTitle}>Recommendation Places</Text>
          <View style={styles.items}>
            {/* This is where the places will go! */}
            {
              chosenPlace.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => convertplacetorecommendation(item,index)}>
                    <Place text={item} choose='yes'/>
                  </TouchableOpacity>
                )
              })
            }
            {
              point.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => convertplacetochosen(item,index)}>
                    <Place text={item} choose='no'/>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

      </ScrollView>

      {/* Write a place */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      {/* <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeplaceWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a place'} value={place} onChangeText={text => setPlace(text)} />
        <TouchableOpacity onPress={() => handleAddplace()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView> */}

    </View>
  );
}
const choose=StyleSheet.create({

  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'#FFCE30'}
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  placesWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeplaceWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});