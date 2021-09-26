import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';


export const plannerList = [];

const PlannerScreen = ()=>{
    console.log(plannerList);
    return(

            plannerList.map((item, index) => {
                console.log(item.place_name);
                return (
                    <View>
                        <Text>{item.place_name}</Text>
                    </View>
                )
            })
        
    );
};

export default PlannerScreen;